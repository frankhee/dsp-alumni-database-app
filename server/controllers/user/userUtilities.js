const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
require('dotenv').config();

//Initialize Airtable instance
const Airtable = require('airtable');
const base = new Airtable({apiKey: `${process.env.AIRTABLE_API_KEY}`}).base(`${process.env.AIRTABLE_DB_ID}`);

//Register new user based on input information
function registerUser(req, res) {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Check if user exists in Airtable
  let isCreated = "", hashedPassword = "";
  base('Users').select({
    filterByFormula: `OR(key = '${req.body.email}', username = '${req.body.username}')`,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    //Check if username or email exists 
    if(records.length) {
      if(records[0].get("username") === req.body.username) {
        isCreated = "username"
      } else {
        isCreated = "email"
      }
    }
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  
  }, function done(err) {
    if (err) { console.error(err); return; }
    //If username or email exists, return error message
    if(isCreated === "username") {
      return res.status(400).json({ new_username: "Username already exists!" });
    } else if(isCreated === "email") {
      return res.status(400).json({ new_email: "Email already exists!" });
    } else {
      //Encrypt input password before storing in Airtable
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          hashedPassword = hash;
          //Create new user in Airtable
          base('Users').create([
            {
              "fields": {
                "Password": hashedPassword,
                "First Name": req.body.firstname,
                "Last Name": req.body.lastname,
                "email": req.body.email,
                "username": req.body.username
              }
            }
          ], function(err) {
            if (err) {
              console.error(err);
              return;
            }
            res.json({message : "User successfully created!"});
          });
        });
      });
    }
  });
}

function loginUser(req, res) {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const identifier = req.body.identifier
  const password = req.body.password;
  const secret = process.env.JWT_SECRET;
  // Find user by email or username
  let userExist = false;
  base('Users').select({
    filterByFormula: `OR(key = '${identifier}', username = '${identifier}')`,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    if(records.length) {
      const currentUser = records[0];
      userExist = true;
      bcrypt.compare(password, currentUser.get('Password')).then(isMatch => {
        // If user exists, create JWT payload
        if (isMatch) {
          const payload = {
            key: currentUser.get("key")
          };
          // Sign token
          jwt.sign(
            payload,
            secret,
            {
              expiresIn: '24h'
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ existing_password: "Password incorrect" });
        }
      });
    }
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  
  }, function done(err) {
    if (err) { console.error(err); return; }
    if(!userExist) {
      return res.status(404).json({ existing_identifier: "Email or username not found" });
    }
  });
}

module.exports = {
  registerUser,
  loginUser
};
