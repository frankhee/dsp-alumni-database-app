const axios = require("axios");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Define the number of records returned each request and max records that can be returned each request
const max = 100;
const pageSize = 16;


//Trigger Airtable query to load product catalog
function handleGetAlumni(req, res) {
  const auth = req.headers.authorization;
  //Authenticate user
  if(auth) {
    if(!auth.startsWith("Bearer")) {
      return res.status(404).json({ token: "Invalid Bearer token!" });
    }
    //Check JWT token
    const bearerToken = auth.substring(7, auth.length);
    jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        return res.status(404).json({ token: "Invalid JWT token!" });
      } else {
        //Get product information
        const offset = req.cookies.offset;
        getAlumniPage(req, res, offset);
      }
    });
  } else {
    return res.status(404).json({ token: "No auth token provided!" });
  }
}

//Query Airtable database to retrieve product information
async function getAlumniPage(req, res, offset = null) {
  let moreAlumni = true, alumni, newOffset;
  if(offset) {
    [alumni, newOffset] = await fetchAlumniPage(offset);
  }else {
    [alumni, newOffset] = await fetchAlumniPage();
  }
  
  //Set offset value in cookie
  if(newOffset) {
    res.cookie('offset', newOffset);
  } else {
    res.clearCookie("offset");
    moreAlumni = false;
  }
  res.json({alumni, moreAlumni});
}

//Fetch product information based on offset
async function fetchAlumniPage(offset = null) {
  try {
    let response;
    if(offset) {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Alumni?fields%5B%5D=First+Name&fields%5B%5D=Last+Name&fields%5B%5D=City&fields%5B%5D=State&fields%5B%5D=Country&fields%5B%5D=Email&fields%5B%5D=Information+Last+Updated&fields%5B%5D=LinkedIn+Link&fields%5B%5D=Employer&maxRecords=${max}&pageSize=${pageSize}&offset=${offset}`);
    } else {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Alumni?fields%5B%5D=First+Name&fields%5B%5D=Last+Name&fields%5B%5D=City&fields%5B%5D=State&fields%5B%5D=Country&fields%5B%5D=Email&fields%5B%5D=Information+Last+Updated&fields%5B%5D=LinkedIn+Link&fields%5B%5D=Employer&maxRecords=${max}&pageSize=${pageSize}`);
    }
    const newOffset = response.data.offset;
    return [response.data.records, newOffset];
  } catch (error) {
    console.error(error);
  }
}

//Retrieve information on a specific product based on product ID
// async function getProductInfo(id) {
//   try {
//     const response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Furniture/${id}`);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = {
  handleGetAlumni,
};
