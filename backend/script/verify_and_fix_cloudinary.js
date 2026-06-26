/**
 * Verify Kure Pharma Cloudinary account and ensure upload preset exists.
 */

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const PRESET_NAME = "kure_pharma_upload";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const run = async () => {
  console.log("=== KURE PHARMA CLOUDINARY SETUP ===");
  console.log("Account:", process.env.CLOUDINARY_CLOUD_NAME);

  try {
    const ping = await cloudinary.api.ping();
    console.log("API Connection:", JSON.stringify(ping));
  } catch (e) {
    console.log("API Connection failed:", e.message);
    return;
  }

  try {
    const presets = await cloudinary.api.upload_presets({ max_results: 50 });
    const existing = presets.presets.find((p) => p.name === PRESET_NAME);
    if (existing) {
      console.log(`Upload preset '${PRESET_NAME}' exists`);
      console.log("Signing mode:", existing.unsigned ? "UNSIGNED" : "SIGNED");
      console.log("Folder:", existing.settings?.folder || "(none)");
      if (!existing.unsigned) {
        await cloudinary.api.update_upload_preset(PRESET_NAME, { unsigned: true });
        console.log("Preset converted to unsigned");
      }
    } else {
      console.log(`Creating upload preset '${PRESET_NAME}'...`);
      await cloudinary.api.create_upload_preset({
        name: PRESET_NAME,
        unsigned: true,
        folder: process.env.CLOUDINARY_FOLDER || "kure-pharma",
        allowed_formats: "jpg,jpeg,png,webp,gif,avif,pdf",
        quality: "auto",
        fetch_format: "auto",
      });
      console.log(`Created unsigned preset '${PRESET_NAME}'`);
    }
  } catch (e) {
    console.log("Upload preset error:", e.message);
  }

  console.log("=== SETUP COMPLETE ===");
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
