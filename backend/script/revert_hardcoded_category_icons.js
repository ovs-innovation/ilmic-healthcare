/**
 * Revert script-mapped category/icon-{slug}.png URLs.
 * Restores the original admin-uploaded icon URLs captured before migration.
 * Does not touch icons that were uploaded directly via Admin Panel.
 */

require("dotenv").config();
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const mongoose = require("mongoose");

const ORIGINAL_ADMIN_ICONS = {
  "silicon-wire":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778682206/category/ChatGPTImageMay13%2C2026%2C07_52_56PM.png",
  "power-connectors":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778681323/category/ChatGPTImageMay13%2C2026%2C07_38_18PM.png",
  "nickle-strips":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778681808/category/ChatGPTImageMay13%2C2026%2C07_46_34PM.png",
  "battery-balancers":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778680673/category/ChatGPTImageMay13%2C2026%2C07_27_22PM.png",
  "battery-power-packs":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778678836/category/ChatGPTImageMay13%2C2026%2C06_54_41PM.png",
  "bms-battery-protection-solution":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778677387/category/ChatGPTImageMay13%2C2026%2C06_30_21PM.png",
  "lithium-ion-battery-cell":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778675596/category/ChatGPTImageMay13%2C2026%2C06_02_36PM.png",
  "daly-bms-nmc":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778785147/category/ChatGPTImageMay15%2C2026%2C12_28_22AM.png",
  "daly-smart-bms":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778785147/category/ChatGPTImageMay15%2C2026%2C12_28_22AM.png",
  "jbd-bms":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778785792/category/ChatGPTImageMay15%2C2026%2C12_30_38AM.png",
  "jbd-nmc-bms":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778786041/category/ChatGPTImageMay15%2C2026%2C12_30_38AM1.png",
  "jbd-smart-bms-lfp":
    "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1778786304/category/ChatGPTImageMay15%2C2026%2C12_30_38AM2.png",
};

const isScriptMappedIcon = (icon) =>
  typeof icon === "string" && /\/category\/icon-[a-z0-9-]+\.png$/i.test(icon);

const getName = (name) => {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name.en || Object.values(name).find(Boolean) || "";
};

const run = async () => {
  await connectDB();

  console.log("Reverting hardcoded icon-{slug}.png mappings...\n");

  const categories = await Category.find({}).lean();
  let reverted = 0;
  let cleared = 0;
  let untouched = 0;

  for (const cat of categories) {
    const name = getName(cat.name);
    const slug = (cat.slug || "").trim().toLowerCase();
    const icon = cat.icon || "";

    if (!isScriptMappedIcon(icon)) {
      untouched++;
      console.log(`  ⏭  ${name} — kept admin URL`);
      continue;
    }

    const original = ORIGINAL_ADMIN_ICONS[slug];
    const nextIcon = original || "";

    await Category.findByIdAndUpdate(cat._id, { icon: nextIcon });

    if (original) {
      reverted++;
      console.log(`  ↩  ${name} — restored original admin URL`);
    } else {
      cleared++;
      console.log(`  ○  ${name} — cleared (no original on record)`);
    }
  }

  console.log(`\nReverted: ${reverted} | Cleared: ${cleared} | Untouched: ${untouched}`);
  console.log("\nFrontend uses Category.icon from API only — no hardcoded images.");

  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
