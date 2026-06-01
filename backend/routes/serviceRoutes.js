const express = require("express");
const router = express.Router();
const {
  addService,
  getAllServices,
  getShowingServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  updateStatus,
  deleteService,
} = require("../controller/serviceController");
const { adminOnly } = require("../config/auth");

// Public storefront reads
router.get("/show", getShowingServices);
router.get("/show/slug/:slug", getServiceBySlug);

// Admin-only service management
router.post("/add", adminOnly, addService);
router.get("/", adminOnly, getAllServices);
router.get("/:id", adminOnly, getServiceById);
router.patch("/:id", adminOnly, updateService);
router.put("/status/:id", adminOnly, updateStatus);
router.delete("/:id", adminOnly, deleteService);

module.exports = router;
