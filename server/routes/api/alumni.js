const express = require("express");
const router = express.Router();
const alumniUtilities = require("../../controllers/alumni/alumniUtilities")

// @route GET api/alumni/allalumni
// @desc Get all alumni info
// @access Public
router.get("/allalumni", alumniUtilities.handleGetAlumni);

// @route POST api/alumni/searchalumni
// @desc Search alumni info based on user input
// @access Public
router.post("/searchalumni", alumniUtilities.handleGetAlumni);

module.exports = router;