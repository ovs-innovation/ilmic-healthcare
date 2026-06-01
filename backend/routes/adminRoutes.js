const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updatedStatus,
} = require("../controller/adminController");
const { passwordVerificationLimit } = require("../lib/email-sender/sender");
const { adminOnly } = require("../config/auth");

// Public auth routes
router.post("/login", loginAdmin);
router.put("/forget-password", passwordVerificationLimit, forgetPassword);
router.put("/reset-password", resetPassword);

// Admin-only staff management
router.post("/register", adminOnly, registerAdmin);
router.post("/add", adminOnly, addStaff);
router.get("/", adminOnly, getAllStaff);
router.post("/:id", adminOnly, getStaffById);
router.put("/:id", adminOnly, updateStaff);
router.put("/update-status/:id", adminOnly, updatedStatus);
router.delete("/:id", adminOnly, deleteStaff);

module.exports = router;
