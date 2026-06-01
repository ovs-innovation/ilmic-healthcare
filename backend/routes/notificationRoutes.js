const express = require("express");
const router = express.Router();
const {
  getAllNotification,
  addNotification,
  updateStatusNotification,
  deleteNotificationById,
  deleteNotificationByProductId,
  deleteManyNotification,
  updateManyStatusNotification,
} = require("../controller/notificationController");
const { adminOnly } = require("../config/auth");

// Admin-only notification management
router.post("/add", adminOnly, addNotification);
router.get("/", adminOnly, getAllNotification);
router.put("/:id", adminOnly, updateStatusNotification);
router.patch("/update/many", adminOnly, updateManyStatusNotification);
router.delete("/:id", adminOnly, deleteNotificationById);
router.delete("/product-id/:id", adminOnly, deleteNotificationByProductId);
router.patch("/delete/many", adminOnly, deleteManyNotification);

module.exports = router;
