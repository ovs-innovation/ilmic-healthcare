require("dotenv").config();
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const getName = (name) => {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name.en || Object.values(name).find(Boolean) || "";
};

const isCloudinary = (url) =>
  typeof url === "string" && url.includes("res.cloudinary.com");

const classifyCategory = (cat, childrenCount) => {
  const id = String(cat._id);
  const isRoot = !cat.parentId;
  const hasChildren = (childrenCount[id] || 0) > 0;
  const isChild = !!cat.parentId;
  const isLeaf = isChild && !hasChildren;

  const types = [];
  if (isRoot) types.push("ROOT CATEGORY");
  if (hasChildren) types.push("PARENT CATEGORY");
  if (isChild) types.push("CHILD CATEGORY");
  if (isLeaf) types.push("LEAF CATEGORY");

  return types;
};

const audit = async () => {
  await connectDB();

  const categories = await Category.find({}).sort({ _id: 1 }).lean();
  const products = await Product.find({}, { category: 1, categories: 1 }).lean();

  const byId = new Map(categories.map((c) => [String(c._id), c]));
  const childrenCount = {};

  categories.forEach((c) => {
    if (c.parentId) {
      childrenCount[c.parentId] = (childrenCount[c.parentId] || 0) + 1;
    }
  });

  const productCount = {};
  products.forEach((p) => {
    const ids = new Set();
    if (p.category) ids.add(String(p.category));
    if (Array.isArray(p.categories)) {
      p.categories.forEach((id) => ids.add(String(id)));
    }
    ids.forEach((id) => {
      productCount[id] = (productCount[id] || 0) + 1;
    });
  });

  const rows = categories.map((cat) => {
    const id = String(cat._id);
    const parent = cat.parentId ? byId.get(String(cat.parentId)) : null;
    const icon = cat.icon || "";
    const types = classifyCategory(cat, childrenCount);

    let imageSource = "NONE";
    if (icon) {
      imageSource = isCloudinary(icon) ? "CLOUDINARY" : "DATABASE (non-Cloudinary URL)";
    }

    return {
      name: getName(cat.name),
      id,
      imageUrl: icon || "(missing)",
      parentName: parent ? getName(parent.name) : "(none)",
      parentId: cat.parentId || "(none)",
      productCount: productCount[id] || 0,
      childCount: childrenCount[id] || 0,
      types,
      imageSource,
      status: cat.status || "show",
      slug: cat.slug || "",
    };
  });

  console.log("\n=== CATEGORY IMAGE & HIERARCHY AUDIT ===\n");
  console.log(`Total categories: ${rows.length}\n`);

  rows.forEach((r, i) => {
    console.log(`--- ${i + 1}. ${r.name} ---`);
    console.log(`Category ID:        ${r.id}`);
    console.log(`Slug:               ${r.slug}`);
    console.log(`Status:             ${r.status}`);
    console.log(`Type:               ${r.types.join(" | ")}`);
    console.log(`Parent Name:        ${r.parentName}`);
    console.log(`Parent ID:          ${r.parentId}`);
    console.log(`Product Count:      ${r.productCount}`);
    console.log(`Child Count:        ${r.childCount}`);
    console.log(`Image URL:          ${r.imageUrl}`);
    console.log(`Image Source:       ${r.imageSource}`);
    console.log("");
  });

  const parentCategories = rows.filter((r) => r.childCount > 0);
  const rootCategories = rows.filter((r) => r.types.includes("ROOT CATEGORY"));
  const childCategories = rows.filter((r) => r.types.includes("CHILD CATEGORY"));
  const withImages = rows.filter((r) => r.imageUrl !== "(missing)");
  const missingImages = rows.filter((r) => r.imageUrl === "(missing)");
  const cloudinaryImages = rows.filter((r) => r.imageSource === "CLOUDINARY");
  const databaseImages = rows.filter(
    (r) => r.imageSource === "DATABASE (non-Cloudinary URL)"
  );

  console.log("\n=== SUMMARY ===\n");
  console.log(`1. Parent categories (${parentCategories.length}):`);
  parentCategories.forEach((r) =>
    console.log(`   - ${r.name} (${r.id}) — ${r.childCount} children`)
  );

  console.log(`\n2. Root categories (${rootCategories.length}):`);
  rootCategories.forEach((r) => console.log(`   - ${r.name} (${r.id})`));

  console.log(`\n3. Child categories (${childCategories.length}):`);
  childCategories.forEach((r) =>
    console.log(`   - ${r.name} (${r.id}) → parent: ${r.parentName}`)
  );

  console.log(`\n4. Categories with images (${withImages.length}):`);
  withImages.forEach((r) => console.log(`   - ${r.name} (${r.imageSource})`));

  console.log(`\n5. Categories missing images (${missingImages.length}):`);
  missingImages.forEach((r) => console.log(`   - ${r.name} (${r.id})`));

  console.log(`\n6. Cloudinary images (${cloudinaryImages.length}):`);
  cloudinaryImages.forEach((r) => console.log(`   - ${r.name}`));

  console.log(`\n7. Database (non-Cloudinary) images (${databaseImages.length}):`);
  databaseImages.forEach((r) =>
    console.log(`   - ${r.name}: ${r.imageUrl.substring(0, 80)}`)
  );

  await mongoose.disconnect();
};

audit().catch((err) => {
  console.error(err);
  process.exit(1);
});
