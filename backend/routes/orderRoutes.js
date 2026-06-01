const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrderCustomer,
  updateOrder,
  deleteOrder,
  getDashboardOrders,
  getDashboardRecentOrder,
  getBestSellerProductChart,
  getDashboardCount,
  getDashboardAmount,
} = require("../controller/orderController");
const { createShiprocketOrder } = require("../controller/shiprocketController");

// All admin order routes (mount-level isAuth + isAdmin applied in api/index.js)
router.get("/", getAllOrders);
router.get("/dashboard", getDashboardOrders);
router.get("/dashboard-recent-order", getDashboardRecentOrder);
router.get("/dashboard-count", getDashboardCount);
router.get("/dashboard-amount", getDashboardAmount);
router.get("/best-seller/chart", getBestSellerProductChart);
router.get("/customer/:id", getOrderCustomer);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/:id/shiprocket", createShiprocketOrder);

module.exports = router;
