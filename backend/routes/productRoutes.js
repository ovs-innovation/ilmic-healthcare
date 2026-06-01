const express = require("express");
const router = express.Router();
const {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateManyProducts,
  updateStatus,
  deleteProduct,
  deleteManyProducts,
  getShowingStoreProducts,
  getProductsByTag,
  getProductsByType,
  getProductsByService,
} = require("../controller/productController");
const { adminOnly } = require("../config/auth");

// Public storefront reads
router.get("/show", getShowingProducts);
router.get("/store", getShowingStoreProducts);
router.get("/tag", getProductsByTag);
router.get("/type", getProductsByType);
router.get("/service", getProductsByService);
router.get("/product/:slug", getProductBySlug);

// Admin-only product management
router.post("/add", adminOnly, addProduct);
router.post("/all", adminOnly, addAllProducts);
router.post("/:id", adminOnly, getProductById);
router.get("/", adminOnly, getAllProducts);
router.patch("/:id", adminOnly, updateProduct);
router.patch("/update/many", adminOnly, updateManyProducts);
router.put("/status/:id", adminOnly, updateStatus);
router.delete("/:id", adminOnly, deleteProduct);
router.patch("/delete/many", adminOnly, deleteManyProducts);

module.exports = router;
