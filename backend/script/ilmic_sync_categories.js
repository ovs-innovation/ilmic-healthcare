require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Setting = require("../models/Setting");
const ilmicHomepageDefaults = require("../utils/ilmicHomepageDefaults");
const {
  ilmicTherapeuticCategories,
  categoryRenameMap,
} = require("../utils/ilmicTherapeuticCategories");

const getCategoryName = (category) => {
  if (!category?.name) return "";
  if (typeof category.name === "string") return category.name;
  return category.name.en || category.name[Object.keys(category.name)[0]] || "";
};

const setCategoryName = (category, name) => {
  if (typeof category.name === "object" && category.name !== null) {
    category.name.en = name;
  } else {
    category.name = { en: name };
  }
};

const syncCategories = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  const categories = await Category.find({});
  const idByName = new Map();

  for (const category of categories) {
    const currentName = getCategoryName(category);
    const nextName = categoryRenameMap[currentName];
    if (nextName && nextName !== currentName) {
      setCategoryName(category, nextName);
      if (!category.slug) {
        const match = ilmicTherapeuticCategories.find((item) => item.name === nextName);
        if (match) category.slug = match.slug;
      }
      await category.save();
      console.log(`Renamed category: ${currentName} -> ${nextName}`);
    }
    idByName.set(getCategoryName(category), category._id);
  }

  for (const item of ilmicTherapeuticCategories) {
    let category = categories.find((entry) => getCategoryName(entry) === item.name);

    if (!category) {
      const renamedFrom = Object.entries(categoryRenameMap).find(
        ([, value]) => value === item.name,
      );
      if (renamedFrom) {
        category = categories.find(
          (entry) => getCategoryName(entry) === renamedFrom[0],
        );
      }
    }

    if (category) {
      setCategoryName(category, item.name);
      category.slug = item.slug;
      category.image = item.image;
      category.status = item.status;
      await category.save();
      idByName.set(item.name, category._id);
      console.log(`Synced category: ${item.name}`);
      continue;
    }

    const created = await Category.create({
      name: { en: item.name },
      slug: item.slug,
      image: item.image,
      status: item.status,
      description: { en: `${item.name} medicines` },
    });
    idByName.set(item.name, created._id);
    console.log(`Created category: ${item.name}`);
  }

  const slugMigration = {
    "oncology-medicines": "Oncology Drugs",
    "anti-cancer-drugs": "Anti-Cancer Medicines",
    "critical-care": "Critical Care Medicines",
    "lifesaving-medicines": "Lifesaving Drugs",
    "imported-medicines": "Imported medicine",
    "hiv-medicines": "HIV",
    "nephrology-medicines": "Nephrology Medicine",
  };

  for (const [oldSlug, newName] of Object.entries(slugMigration)) {
    const targetId = idByName.get(newName);
    if (!targetId) continue;

    const oldCategory = categories.find((entry) => entry.slug === oldSlug);
    if (!oldCategory) continue;

    const result = await Product.updateMany(
      { category: oldCategory._id },
      { $set: { category: targetId } },
    );
    if (result.modifiedCount) {
      console.log(
        `Reassigned ${result.modifiedCount} products from ${oldSlug} to ${newName}`,
      );
    }
  }

  await Setting.findOneAndUpdate(
    { name: "ilmicHomepageSetting" },
    {
      $set: {
        setting: ilmicHomepageDefaults,
        name: "ilmicHomepageSetting",
      },
    },
    { upsert: true },
  );
  console.log("Homepage settings updated with new categories.");

  console.log("Category sync complete.");
  process.exit(0);
};

syncCategories().catch((error) => {
  console.error("Category sync failed:", error.message);
  process.exit(1);
});
