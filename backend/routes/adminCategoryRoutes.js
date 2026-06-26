const express = require("express");
const router = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controller/categoryController");

router.get("/", getAllCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
