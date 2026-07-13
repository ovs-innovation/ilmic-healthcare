/**
 * Upsert "Hero Products" category and ILMIC own-brand hero medicines.
 * Safe to re-run — updates by slug, does not delete existing products.
 */
require("dotenv").config();
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");

const HERO_CATEGORY = {
  name: { en: "Hero Products" },
  description: {
    en: "ILMIC Health Care flagship products — supplements, antibiotics, and oncology medicines.",
  },
  slug: "hero-products",
  status: "show",
  icon: "/products/qlq-10.png",
};

const heroProducts = [
  {
    name: "QLQ 10",
    slug: "qlq-10",
    composition:
      "Co-Enzyme Q10 300 mg, L-Arginine 250 mg, Omega-3 Fatty Acid 250 mg, Selenium 70 mg, Zinc 20 mg, Lycopene USP 6% 3000 mcg",
    dosageForm: "Softgel Capsule",
    form: "Softgel Capsule",
    route: "Oral",
    strength: "Multi-ingredient",
    manufacturer: "ILMIC Health Care Pvt. Ltd.",
    subCategory: "Health Supplement",
    image: "/products/qlq-10.png",
    uses:
      "Nutraceutical softgel with Co-Enzyme Q10, L-Arginine, Omega-3, Selenium, Zinc and Lycopene for daily wellness support.",
    packaging: "Strip / bottle pack (as per batch)",
    storageConditions: "Store in a cool, dry place below 30°C. Protect from light and moisture.",
    type: "trending",
  },
  {
    name: "IMIC ENERGY",
    slug: "imic-energy",
    composition:
      "L-Arginine 100 mg, Epimedium Extract 70 mg, Zinc 7.5 mg, Withania Somnifera 50 mg, Asphaltum Punjabianum 50 mg, Chlorophytum Borivilianum 100 mg, Moringa Extract 50 mg, Lepidium Extract 40 mg, Tribulus Terrestris 50 mg, Ginkgo Biloba 40 mg, Mucuna Pruriens 35 mg, Yohimbe Bark 5 mg",
    dosageForm: "Capsules",
    form: "Capsules",
    route: "Oral",
    strength: "Multi-ingredient",
    manufacturer: "ILMIC Health Care Pvt. Ltd.",
    subCategory: "Energy & Vitality",
    image: "/products/imic-energy.png",
    uses:
      "Ayurvedic-herbal blend capsules with L-Arginine, Ashwagandha, Moringa, Tribulus and other botanical extracts for energy and vitality.",
    packaging: "Capsule strip / bottle pack",
    storageConditions: "Store below 30°C in a dry place. Keep away from direct sunlight.",
    type: "trending",
  },
  {
    name: "CTUXIL 500",
    slug: "ctuxil-500",
    composition: "Cefuroxime Axetil 500 mg",
    dosageForm: "Tablet",
    form: "Tablet",
    route: "Oral",
    strength: "500 mg",
    manufacturer: "ILMIC Health Care Pvt. Ltd.",
    subCategory: "Antibiotic",
    image: "/products/ctuxil-500.png",
    uses:
      "Cefuroxime Axetil broad-spectrum cephalosporin antibiotic tablet for bacterial infections as prescribed by a physician.",
    packaging: "10 tablets per strip",
    storageConditions: "Store below 30°C. Protect from moisture.",
    type: "trending",
  },
  {
    name: "ABIRAMIC 250",
    slug: "abiramic-250",
    composition: "Abiraterone Acetate 250 mg",
    dosageForm: "Tablet",
    form: "Tablet",
    route: "Oral",
    strength: "250 mg",
    manufacturer: "ILMIC Health Care Pvt. Ltd.",
    subCategory: "Oncology",
    image: "/products/abiramic-250.png",
    uses:
      "Abiraterone acetate tablet indicated for metastatic castration-resistant prostate cancer, used with prednisone as directed by an oncologist.",
    packaging: "120 tablets per bottle",
    storageConditions: "Store below 30°C. Keep container tightly closed.",
    type: "trending",
  },
  {
    name: "PACMIC 300",
    slug: "pacmic-300",
    composition: "Paclitaxel 300 mg",
    dosageForm: "Injection",
    form: "Injection",
    route: "IV Infusion",
    strength: "300 mg",
    manufacturer: "ILMIC Health Care Pvt. Ltd.",
    subCategory: "Oncology",
    image: "/products/pacmic-300.png",
    uses:
      "Paclitaxel injection for oncology treatment including breast, ovarian and lung cancers — administered under specialist supervision.",
    packaging: "Single-use vial 300 mg",
    storageConditions: "Store refrigerated at 2°C to 8°C. Do not freeze. Protect from light.",
    coldChain: true,
    type: "trending",
  },
];

const seedHeroProducts = async () => {
  await connectDB();
  console.log("Seeding Hero Products category and medicines...\n");

  let category = await Category.findOne({ slug: HERO_CATEGORY.slug });
  if (category) {
    await Category.updateOne({ _id: category._id }, { $set: HERO_CATEGORY });
    console.log(`↻ Updated category: ${HERO_CATEGORY.name.en}`);
  } else {
    category = await Category.create(HERO_CATEGORY);
    console.log(`✓ Created category: ${HERO_CATEGORY.name.en}`);
  }

  const catId = category._id;
  let created = 0;
  let updated = 0;

  for (const p of heroProducts) {
    const doc = {
      title: { en: p.name },
      slug: p.slug,
      description: { en: p.uses },
      category: catId,
      categories: [catId],
      image: [p.image],
      composition: p.composition,
      strength: p.strength,
      dosageForm: p.dosageForm,
      manufacturer: p.manufacturer,
      subCategory: p.subCategory,
      form: p.form,
      route: p.route,
      availability: "Prescription Required",
      coldChain: Boolean(p.coldChain),
      uses: p.uses,
      packaging: p.packaging,
      storageConditions: p.storageConditions,
      price: 0,
      originalPrice: 0,
      basePrice: 0,
      gstPercentage: 12,
      isCombination: false,
      status: "show",
      type: p.type || "trending",
      tag: ["featured", "hero-product", "indian-brand"],
      stock: 999,
      trackInventory: false,
    };

    const existing = await Product.findOne({ slug: p.slug });
    if (existing) {
      await Product.updateOne({ _id: existing._id }, { $set: doc });
      updated += 1;
      console.log(`↻ Updated: ${p.name}`);
    } else {
      await Product.create(doc);
      created += 1;
      console.log(`✓ Created: ${p.name}`);
    }
  }

  console.log(`\nDone — category "${HERO_CATEGORY.name.en}", ${created} created, ${updated} updated.`);
  const featured = await Product.countDocuments({ tag: "featured", status: "show" });
  console.log(`Featured products visible: ${featured}`);
  process.exit(0);
};

seedHeroProducts().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
