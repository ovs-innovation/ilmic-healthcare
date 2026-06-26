const express = require("express");
const router = express.Router();
const {
  addBrand,
  getShowingBrands,
  getFeaturedBrands,
  getAllBrands,
  getBrandBySlug,
  getBrandById,
  updateBrand,
  updateStatus,
  deleteBrand,
} = require("../controller/brandController");
const { adminOnly } = require("../config/auth");

router.get("/show", getShowingBrands);
router.get("/featured", getFeaturedBrands);
router.get("/slug/:slug", getBrandBySlug);

router.post("/add", adminOnly, addBrand);
router.get("/", adminOnly, getAllBrands);
router.get("/:id", adminOnly, getBrandById);
router.put("/:id", adminOnly, updateBrand);
router.put("/status/:id", adminOnly, updateStatus);
router.delete("/:id", adminOnly, deleteBrand);

module.exports = router;
