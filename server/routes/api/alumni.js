const express = require("express");
const router = express.Router();
const alumniUtilities = require("../../controllers/alumni/alumniUtilities")

// @route GET api/products/allproducts
// @desc Get all product info
// @access Public
router.get("/allalumni", alumniUtilities.handleGetAlumni);

// @route GET api/products/product
// @desc Send requested product info to user
// @access Public
// router.post("/product", alumniUtilities.sendProductInfo);

module.exports = router;