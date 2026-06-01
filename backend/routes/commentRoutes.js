const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByBlogId,
  getAllComments,
  updateCommentStatus,
  deleteComment,
} = require("../controller/commentController");
const { adminOnly } = require("../config/auth");

// Public routes
router.post("/add", addComment);
router.get("/blog/:blogId", getCommentsByBlogId);

// Admin-only comment management
router.get("/", adminOnly, getAllComments);
router.put("/status/:id", adminOnly, updateCommentStatus);
router.delete("/:id", adminOnly, deleteComment);

module.exports = router;
