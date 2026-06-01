const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviewsByProduct,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controller/reviewController");
const { adminOnly } = require("../config/auth");

// Public storefront routes
router.post("/add", addReview);
router.get("/product/:id", getReviewsByProduct);

// Admin-only review management
router.get("/", adminOnly, getAllReviews);
router.put("/:id", adminOnly, updateReviewStatus);
router.delete("/:id", adminOnly, deleteReview);

module.exports = router;
