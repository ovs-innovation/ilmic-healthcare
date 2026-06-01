const express = require("express");
const router = express.Router();
const {
  addBlog,
  getAllBlogs,
  getShowingBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  updateStatus,
  deleteBlog,
} = require("../controller/blogController");
const { adminOnly } = require("../config/auth");

// Public storefront reads
router.get("/show", getShowingBlogs);
router.get("/slug/:slug", getBlogBySlug);

// Admin-only blog management
router.post("/add", adminOnly, addBlog);
router.get("/", adminOnly, getAllBlogs);
router.post("/:id", adminOnly, getBlogById);
router.patch("/:id", adminOnly, updateBlog);
router.put("/status/:id", adminOnly, updateStatus);
router.delete("/:id", adminOnly, deleteBlog);

module.exports = router;
