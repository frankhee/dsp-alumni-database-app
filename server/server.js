const express = require("express");
const axios = require("axios");
const path = require('path')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const users = require("./routes/api/users");
const alumni = require("./routes/api/alumni");
const app = express();
require('dotenv').config();

//*********COMMENT OUT FOR DEPLOY*********//
const cors = require('cors');
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//*****************************************//

// app.use(express.static(path.join(__dirname, '../client/build')));

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser()); 

//Attach Airtable API key to axios requests 
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

//API endpoints
app.use("/api/users", users);
app.use("/api/alumni", alumni);

//Listent to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
