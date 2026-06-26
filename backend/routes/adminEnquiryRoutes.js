const express = require("express");
const router = express.Router();
const {
  getAllEnquiries,
  updateEnquiryStatus,
} = require("../controller/enquiryController");

router.get("/", getAllEnquiries);
router.put("/:id", updateEnquiryStatus);

module.exports = router;
