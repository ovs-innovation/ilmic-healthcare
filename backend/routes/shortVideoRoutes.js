const express = require("express");
const router = express.Router();
const {
  addShortVideo,
  getAllShortVideos,
  getShowingShortVideos,
  getShortVideoById,
  updateShortVideo,
  updateStatus,
  deleteShortVideo,
} = require("../controller/shortVideoController");
const { adminOnly } = require("../config/auth");

// Public storefront read
router.get("/show", getShowingShortVideos);

// Admin-only short video management
router.post("/add", adminOnly, addShortVideo);
router.get("/all", adminOnly, getAllShortVideos);
router.get("/:id", adminOnly, getShortVideoById);
router.put("/:id", adminOnly, updateShortVideo);
router.put("/status/:id", adminOnly, updateStatus);
router.delete("/active/:id", adminOnly, deleteShortVideo);

module.exports = router;
