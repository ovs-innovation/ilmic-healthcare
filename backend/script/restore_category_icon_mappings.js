/**
 * DEPRECATED — Do not run.
 *
 * This script overwrote admin-uploaded Category.icon values with hardcoded
 * category/icon-{slug}.png URLs. Use Admin Panel uploads instead, or run
 * revert_hardcoded_category_icons.js to restore original admin URLs.
 */

require("dotenv").config();
const https = require("https");
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const mongoose = require("mongoose");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dkeceuhqb";

const getName = (name) => {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name.en || Object.values(name).find(Boolean) || "";
};

const iconUrlForSlug = (slug) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/category/icon-${slug}.png`;

const testUrl = (url) =>
  new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD" }, (res) =>
      resolve(res.statusCode)
    );
    req.on("error", () => resolve(0));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(0);
    });
    req.end();
  });

const run = async () => {
  await connectDB();

  console.log("==============================================");
  console.log("RESTORE CATEGORY ICON MAPPINGS");
  console.log(`Cloud: ${cloudName}`);
  console.log("Pattern: category/icon-{slug}.png");
  console.log("==============================================\n");

  const categories = await Category.find({}).sort({ createdAt: 1 }).lean();
  const updated = [];
  const skipped = [];
  const verified = [];

  for (const cat of categories) {
    const name = getName(cat.name);
    const slug = (cat.slug || "").trim().toLowerCase();

    if (!slug) {
      skipped.push({ name, slug: "(missing)", reason: "No slug on category" });
      continue;
    }

    const url = iconUrlForSlug(slug);
    const status = await testUrl(url);

    if (status !== 200) {
      skipped.push({
        name,
        slug,
        reason: `No working asset (HTTP ${status || "ERR"})`,
        currentIcon: cat.icon || "(empty)",
      });
      continue;
    }

    const previous = cat.icon || "";
    if (previous === url) {
      skipped.push({
        name,
        slug,
        reason: "Already mapped correctly",
        url,
      });
      verified.push({ name, slug, url, status: 200 });
      continue;
    }

    await Category.findByIdAndUpdate(cat._id, { icon: url });
    updated.push({
      name,
      slug,
      from: previous || "(empty)",
      to: url,
    });
    verified.push({ name, slug, url, status: 200 });
    console.log(`  ✅ ${name} (${slug})`);
    console.log(`     → ${url}`);
  }

  console.log("\n--- UPDATED (" + updated.length + ") ---");
  updated.forEach((r) => {
    console.log(`  ${r.name} [${r.slug}]`);
    console.log(`    from: ${String(r.from).substring(0, 80)}`);
    console.log(`    to:   ${r.to}`);
  });

  console.log("\n--- SKIPPED (" + skipped.length + ") ---");
  skipped.forEach((r) => {
    console.log(`  ${r.name} [${r.slug}] — ${r.reason}`);
  });

  console.log("\n--- HTTP 200 VERIFICATION ---");
  const allWithIcons = await Category.find({ icon: { $ne: "" } }).lean();
  let allOk = true;
  for (const cat of allWithIcons) {
    const status = await testUrl(cat.icon);
    const ok = status === 200;
    if (!ok) allOk = false;
    console.log(
      `  [${status}] ${getName(cat.name)} — ${cat.icon.substring(0, 75)}...`
    );
  }

  console.log(
    allOk
      ? "\n✅ All category icon URLs return HTTP 200"
      : "\n⚠️  Some icon URLs did not return HTTP 200"
  );

  console.log("\n==============================================");
  console.log(`Updated: ${updated.length} | Skipped: ${skipped.length}`);
  console.log("==============================================");

  await mongoose.disconnect();
  process.exit(allOk ? 0 : 1);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
