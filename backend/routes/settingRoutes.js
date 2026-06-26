const router = require("express").Router();

const {
  addGlobalSetting,
  getGlobalSetting,
  updateGlobalSetting,
  addStoreSetting,
  getStoreSetting,
  updateStoreSetting,
  getStoreSeoSetting,
  addStoreCustomizationSetting,
  getStoreCustomizationSetting,
  updateStoreCustomizationSetting,
  getKureHomepageSetting,
  updateKureHomepageSetting,
} = require("../controller/settingController");
const { adminOnly } = require("../config/auth");

// Public storefront reads
router.get("/global/all", getGlobalSetting);
router.get("/store-setting/all", getStoreSetting);
router.get("/store-setting/seo", getStoreSeoSetting);
router.get("/store/customization/all", getStoreCustomizationSetting);
router.get("/kure-homepage/all", getKureHomepageSetting);

// Admin-only settings management
router.post("/global/add", adminOnly, addGlobalSetting);
router.put("/global/update", adminOnly, updateGlobalSetting);
router.post("/store-setting/add", adminOnly, addStoreSetting);
router.put("/store-setting/update", adminOnly, updateStoreSetting);
router.post("/store/customization/add", adminOnly, addStoreCustomizationSetting);
router.put("/store/customization/update", adminOnly, updateStoreCustomizationSetting);
router.put("/kure-homepage/update", adminOnly, updateKureHomepageSetting);

module.exports = router;
