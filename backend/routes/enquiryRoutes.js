const express = require("express");
const router = express.Router();
const { createEnquiry } = require("../controller/enquiryController");

// Public routes
router.post("/", createEnquiry);

module.exports = router;
