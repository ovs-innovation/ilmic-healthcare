/**
 * Upsert 7 Indian-branded specialty medicines with real packshot images.
 * Safe to re-run — updates by slug, does not delete existing products.
 */
require("dotenv").config();
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");

const indianProducts = [
  {
    name: "Midostar",
    slug: "midostar",
    composition: "Midostaurin",
    strength: "25mg",
    dosageForm: "Soft Gelatin Capsules",
    manufacturer: "Zydus",
    catSlug: "anti-cancer-medicines",
    subCategory: "Targeted Therapy",
    form: "Capsules",
    route: "Oral",
    coldChain: false,
    image: "/products/ramiven.png",
    uses:
      "Indian branded midostaurin for FLT3-positive acute myeloid leukemia (AML), in combination with standard chemotherapy.",
    packaging: "Bottle of 56 soft gelatin capsules",
    storageConditions: "Store at 20°C to 25°C. Protect from moisture.",
  },
  {
    name: "Hertraz",
    slug: "hertraz",
    composition: "Trastuzumab",
    strength: "440mg",
    dosageForm: "Injection",
    manufacturer: "Mylan",
    catSlug: "oncology-drugs",
    subCategory: "Monoclonal Antibody",
    form: "Injection",
    route: "IV Infusion",
    coldChain: true,
    image: "/products/hertuma.png",
    uses:
      "HER2-targeted trastuzumab for HER2-positive breast cancer and metastatic gastric cancer.",
    packaging: "440 mg multi-dose vial",
    storageConditions: "Store refrigerated at 2°C to 8°C. Do not freeze.",
  },
  {
    name: "Somalinx LAR",
    slug: "somalinx-lar",
    composition: "Octreotide",
    strength: "30mg",
    dosageForm: "Injection",
    manufacturer: "Emcure",
    catSlug: "critical-care-medicines",
    subCategory: "Injectable",
    form: "Injection",
    route: "IM Injection",
    coldChain: true,
    image: "/products/adcetris.png",
    uses:
      "Long-acting octreotide for severe diarrhea and flushing in metastatic carcinoid tumors.",
    packaging: "Vial with diluent syringe kit",
    storageConditions: "Store refrigerated between 2°C and 8°C.",
  },
  {
    name: "Venclax",
    slug: "venclax",
    composition: "Venetoclax",
    strength: "100mg",
    dosageForm: "Tablets",
    manufacturer: "AbbVie",
    catSlug: "lifesaving-drugs",
    subCategory: "Blood Cancer",
    form: "Tablet",
    route: "Oral",
    coldChain: false,
    image: "/products/venclexta.png",
    uses:
      "Lifesaving BCL-2 inhibitor for chronic lymphocytic leukemia (CLL) and acute myeloid leukemia.",
    packaging: "Pack of 14 tablets",
    storageConditions: "Store below 30°C in original container.",
  },
  {
    name: "Tukavo",
    slug: "tukavo",
    composition: "Tucatinib",
    strength: "150mg",
    dosageForm: "Tablets",
    manufacturer: "Zydus",
    catSlug: "imported-medicine",
    subCategory: "Targeted Therapy",
    form: "Tablet",
    route: "Oral",
    coldChain: false,
    image: "/products/tagrisso.png",
    uses:
      "Imported specialty tucatinib for HER2-positive metastatic breast cancer.",
    packaging: "Pack of 30 tablets",
    storageConditions: "Store below 30°C. Protect from moisture.",
  },
  {
    name: "Taffic",
    slug: "taffic",
    composition: "Bictegravir / Emtricitabine / Tenofovir Alafenamide",
    strength: "50mg/200mg/25mg",
    dosageForm: "Tablets",
    manufacturer: "Gilead",
    catSlug: "hiv",
    subCategory: "Antiretroviral",
    form: "Tablet",
    route: "Oral",
    coldChain: false,
    image: "/products/hiv.png",
    uses:
      "Single-tablet HIV-1 regimen for adults and adolescents weighing at least 25 kg.",
    packaging: "Bottle of 30 tablets",
    storageConditions: "Store below 30°C in original bottle.",
  },
  {
    name: "Kryxana",
    slug: "kryxana",
    composition: "Ribociclib",
    strength: "200mg",
    dosageForm: "Tablets",
    manufacturer: "Novartis",
    catSlug: "nephrology-medicine",
    subCategory: "Oncology Support",
    form: "Tablet",
    route: "Oral",
    coldChain: false,
    image: "/products/kryxana.png",
    uses:
      "CDK4/6 inhibitor indicated with aromatase inhibitor for HR-positive, HER2-negative breast cancer.",
    packaging: "Pack of 21 tablets",
    storageConditions: "Store at room temperature below 30°C.",
  },
  {
    name: "Adcetris",
    slug: "adcetris",
    composition: "Brentuximab Vedotin",
    strength: "50mg",
    dosageForm: "Injection",
    manufacturer: "Takeda",
    catSlug: "oncology-drugs",
    subCategory: "Lymphoma",
    form: "For Injection (Lyophilized Powder)",
    route: "IV Infusion",
    coldChain: true,
    image: "/products/adcetris.png",
    uses:
      "Brentuximab vedotin is used in selected CD30-positive lymphomas (e.g. Hodgkin lymphoma) as prescribed by a specialist.",
    indications:
      "Indicated for selected CD30-positive lymphomas in adults, based on physician assessment and approved clinical guidelines.",
    dosage:
      "Dose and schedule are determined by the treating oncologist. Administration is via IV infusion in a clinical setting.",
    packaging:
      "Single-use vial containing 50 mg lyophilized powder for infusion (with diluent as per manufacturer pack).",
    storageConditions: "Refrigerated (2°C to 8°C). Do not freeze. Protect from light.",
    productFaqs: [
      {
        question: "Is a prescription required to source this medicine?",
        answer:
          "Yes. Specialty oncology medicines are supplied only against a valid prescription and as per applicable regulations.",
      },
      {
        question: "How is cold-chain shipment handled?",
        answer:
          "If cold-chain is required, we ship using validated temperature-controlled packaging (2°C to 8°C) and reliable logistics partners.",
      },
      {
        question: "What documents are provided with supply?",
        answer:
          "Typically invoice, batch/expiry details, and supporting quality documents as applicable (e.g., COA). Availability may vary by product and sourcing route.",
      },
    ],
    customSections: [
      {
        title: "Sourcing & Dispatch",
        content:
          "Kure Pharma supports hospital, clinic, and institutional sourcing. Share your required quantity, destination, and preferred delivery timeline to receive a quotation.",
      },
      {
        title: "Compliance Note",
        content:
          "Clinical use information on this website is for general reference only. Always follow the prescribing information and the treating physician’s guidance.",
      },
    ],
  },
];

const getCategoryName = (category) => {
  if (!category?.name) return "";
  if (typeof category.name === "string") return category.name;
  return category.name.en || "";
};

const seedIndianProducts = async () => {
  await connectDB();
  console.log("Connected to MongoDB\n");

  const categories = await Category.find({}).lean();
  const catBySlug = {};
  for (const cat of categories) {
    if (cat.slug) catBySlug[cat.slug] = cat._id;
    catBySlug[getCategoryName(cat)] = cat._id;
  }

  let created = 0;
  let updated = 0;

  for (const [index, p] of indianProducts.entries()) {
    const catId = catBySlug[p.catSlug];
    if (!catId) {
      console.warn(`⚠ Skipping ${p.name}: category slug "${p.catSlug}" not found`);
      continue;
    }

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
      coldChain: p.coldChain,
      uses: p.uses,
      indications: p.indications || "",
      dosage: p.dosage || "",
      packaging: p.packaging,
      storageConditions: p.storageConditions,
      productFaqs: Array.isArray(p.productFaqs) ? p.productFaqs : [],
      customSections: Array.isArray(p.customSections) ? p.customSections : [],
      price: 0,
      originalPrice: 0,
      basePrice: 0,
      gstPercentage: 12,
      isCombination: false,
      status: "show",
      type: index < 5 ? "trending" : "popular",
      tag: ["featured", "indian-brand"],
      stock: 999,
      trackInventory: false,
    };

    const existing = await Product.findOne({ slug: p.slug });
    if (existing) {
      await Product.updateOne({ _id: existing._id }, { $set: doc });
      updated += 1;
      console.log(`↻ Updated: ${p.name} (${p.image})`);
    } else {
      await Product.create(doc);
      created += 1;
      console.log(`✓ Created: ${p.name} (${p.image})`);
    }
  }

  console.log(`\nDone — ${created} created, ${updated} updated.`);
  const featured = await Product.countDocuments({
    tag: "featured",
    status: "show",
  });
  console.log(`Featured products visible: ${featured}`);
  process.exit(0);
};

seedIndianProducts().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
