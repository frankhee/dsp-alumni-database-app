const axios = require("axios");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Define the number of records returned each request
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
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Alumni?sort%5B0%5D%5Bfield%5D=Graduation+Date&sort%5B0%5D%5Bdirection%5D=desc&fields%5B%5D=First+Name&fields%5B%5D=Graduation+Date&fields%5B%5D=Last+Name&fields%5B%5D=City&fields%5B%5D=State&fields%5B%5D=Country&fields%5B%5D=Email&fields%5B%5D=Information+Last+Updated&fields%5B%5D=LinkedIn&fields%5B%5D=Employer&pageSize=${pageSize}&offset=${offset}`);
    } else {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Alumni?sort%5B0%5D%5Bfield%5D=Graduation+Date&sort%5B0%5D%5Bdirection%5D=desc&fields%5B%5D=First+Name&fields%5B%5D=Last+Name&fields%5B%5D=Graduation+Date&fields%5B%5D=City&fields%5B%5D=State&fields%5B%5D=Country&fields%5B%5D=Email&fields%5B%5D=Information+Last+Updated&fields%5B%5D=LinkedIn&fields%5B%5D=Employer&pageSize=${pageSize}`);
    }
    const newOffset = response.data.offset;
    return [response.data.records, newOffset];
  } catch (error) {
    console.error(error);
  }
}

//Fetch alumni information based on search input
async function searchAlumniPage(offset = null) {
  try {
    let response;
    if(offset) {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Alumni?fields%5B%5D=First+Name&fields%5B%5D=Last+Name&fields%5B%5D=Graduation+Date&fields%5B%5D=City&fields%5B%5D=State&fields%5B%5D=Employer&fields%5B%5D=Country&fields%5B%5D=Email&fields%5B%5D=LinkedIn&fields%5B%5D=Information+Last+Updated&filterByFormula=OR(Employer+%3D+''%2C+City+%3D+'%3D'%2C+First+Name+%3D+''%2C+Last+Name+%3D+''%2C+Graduation+Date+%3D+''%2C+State+%3D+''%2C+)&pageSize=16&sort%5B0%5D%5Bfield%5D=Graduation+Date&sort%5B0%5D%5Bdirection%5D=desc&offset=${offset}`);
    } else {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Alumni?fields%5B%5D=First+Name&fields%5B%5D=Last+Name&fields%5B%5D=Graduation+Date&fields%5B%5D=City&fields%5B%5D=State&fields%5B%5D=Employer&fields%5B%5D=Country&fields%5B%5D=Email&fields%5B%5D=LinkedIn&fields%5B%5D=Information+Last+Updated&filterByFormula=OR(Employer+%3D+''%2C+City+%3D+'%3D'%2C+First+Name+%3D+''%2C+Last+Name+%3D+''%2C+Graduation+Date+%3D+''%2C+State+%3D+''%2C+)&pageSize=16&sort%5B0%5D%5Bfield%5D=Graduation+Date&sort%5B0%5D%5Bdirection%5D=desc`);
    }
    const newOffset = response.data.offset;
    return [response.data.records, newOffset];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  handleGetAlumni,
};
