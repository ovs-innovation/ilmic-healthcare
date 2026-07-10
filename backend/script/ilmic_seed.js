require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");

const {
  ilmicTherapeuticCategories,
} = require("../utils/ilmicTherapeuticCategories");

const categoriesData = ilmicTherapeuticCategories.map(
  ({ name, slug, image, status }) => ({
    name,
    slug,
    image,
    status,
  }),
);

const productsData = [
  {
    name: "Midostar",
    slug: "midostar",
    composition: "Midostaurin",
    strength: "25mg",
    dosageForm: "Soft Gelatin Capsules",
    manufacturer: "Zydus",
    catSlug: "oncology-medicines",
    subCategory: "Targeted Therapy",
    form: "Capsules",
    route: "Oral",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/capsule_bottle.png",
    uses: "Indicated for newly diagnosed acute myeloid leukemia (AML) that is FLT3 mutation-positive, in combination with standard induction and consolidation chemotherapy.",
    packaging: "Bottles of 56 Softgel Capsules",
    storageConditions: "Store at 20°C to 25°C (68°F to 77°F); excursions permitted between 15°C and 30°C."
  },
  {
    name: "Intazumab",
    slug: "intazumab",
    composition: "Pertuzumab",
    strength: "420mg/14ml",
    dosageForm: "Injection",
    manufacturer: "Intas",
    catSlug: "oncology-medicines",
    subCategory: "Monoclonal Antibody",
    form: "Injection",
    route: "IV Infusion",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/injection_vial.png",
    uses: "HER2-targeted therapy for metastatic breast cancer, used in combination with trastuzumab and docetaxel.",
    packaging: "Single-dose vial containing 420 mg/14 mL solution",
    storageConditions: "Store refrigerated at 2°C to 8°C (36°F to 46°F) in original carton to protect from light. Do not freeze."
  },
  {
    name: "Ibruzee",
    slug: "ibruzee",
    composition: "Ibrutinib",
    strength: "140mg",
    dosageForm: "Capsules",
    manufacturer: "Zee Laboratories",
    catSlug: "oncology-medicines",
    subCategory: "Blood Cancer",
    form: "Capsule",
    route: "Oral",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/targeted_therapy_pack.png",
    uses: "Used for treating patients with Mantle Cell Lymphoma (MCL), Chronic Lymphocytic Leukemia (CLL), and Waldenstrom's Macroglobulinemia.",
    packaging: "Strip pack of 30 Capsules",
    storageConditions: "Store below 25°C. Keep container tightly closed."
  },
  {
    name: "Somalinx LAR",
    slug: "somalinx-lar",
    composition: "Octreotide",
    strength: "30mg",
    dosageForm: "Injection",
    manufacturer: "Emcure",
    catSlug: "critical-care",
    subCategory: "Injectable",
    form: "Injection",
    route: "IM Injection",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/critical_care_injection.png",
    uses: "Long-acting release suspension for severe diarrhea and flushing episodes associated with metastatic carcinoid tumors.",
    packaging: "Vial with diluent syringe kit",
    storageConditions: "Store refrigerated between 2°C and 8°C. Protect from light."
  },
  {
    name: "Mediopa",
    slug: "mediopa",
    composition: "Thiotepa",
    strength: "100mg",
    dosageForm: "Injection",
    manufacturer: "Oncology Division",
    catSlug: "oncology-medicines",
    subCategory: "Chemotherapy",
    form: "Injection",
    route: "IV / Intracavitary",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/injection_vial.png",
    uses: "Alkylating agent indicated to reduce the risk of graft rejection when used in conjunction with high-dose chemotherapy.",
    packaging: "Single-dose sterile lyophilized powder vial",
    storageConditions: "Store in a refrigerator (2°C to 8°C)."
  },
  {
    name: "Tucanat",
    slug: "tucanat",
    composition: "Tucatinib",
    strength: "150mg",
    dosageForm: "Tablets",
    manufacturer: "Natco",
    catSlug: "targeted-therapy",
    subCategory: "Targeted Therapy",
    form: "Tablet",
    route: "Oral",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/targeted_therapy_pack.png",
    uses: "Oral tyrosine kinase inhibitor indicated in combination with trastuzumab and capecitabine for advanced HER2-positive breast cancer.",
    packaging: "Bottle of 60 Tablets",
    storageConditions: "Store at room temperature below 30°C."
  },
  {
    name: "Carzomib",
    slug: "carzomib",
    composition: "Carfilzomib",
    strength: "60mg",
    dosageForm: "Injection",
    manufacturer: "Oncology Division",
    catSlug: "oncology-medicines",
    subCategory: "Multiple Myeloma",
    form: "Injection",
    route: "IV Infusion",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/injection_vial.png",
    uses: "Indicated for patients with relapsed or refractory multiple myeloma who have received one to three prior lines of therapy.",
    packaging: "Single-dose vial containing lyophilized cake",
    storageConditions: "Store refrigerated at 2°C to 8°C."
  },
  {
    name: "Tishta",
    slug: "tishta",
    composition: "Nivolumab",
    strength: "100mg/10ml",
    dosageForm: "Injection",
    manufacturer: "Zydus",
    catSlug: "immunotherapy",
    subCategory: "Immunotherapy",
    form: "Injection",
    route: "IV Infusion",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/immunotherapy_kit.png",
    uses: "Monoclonal antibody acting as a PD-1 inhibitor for advanced melanoma, NSCLC, RCC, and classical Hodgkin lymphoma.",
    packaging: "10 mL single-use vial",
    storageConditions: "Store under refrigeration at 2°C to 8°C. Do not freeze."
  },
  {
    name: "DenosteoRel",
    slug: "denosteorel",
    composition: "Denosumab",
    strength: "60mg",
    dosageForm: "Injection",
    manufacturer: "Reliance",
    catSlug: "bone-health",
    subCategory: "Bone Health",
    form: "Injection",
    route: "Subcutaneous",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/bone_health_kit.png",
    uses: "RANK ligand inhibitor indicated for the treatment of postmenopausal women with osteoporosis at high risk for fracture.",
    packaging: "Pre-filled syringe containing 60 mg/1 mL",
    storageConditions: "Store in refrigerator at 2°C to 8°C. Keep in original package to protect from light."
  },
  {
    name: "Treoall",
    slug: "treoall",
    composition: "Treosulfan",
    strength: "5gm",
    dosageForm: "Injection",
    manufacturer: "Oncology Division",
    catSlug: "oncology-medicines",
    subCategory: "Chemotherapy",
    form: "Injection",
    route: "IV Infusion",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/injection_vial.png",
    uses: "Conditioning treatment prior to allogeneic hematopoietic stem cell transplantation in adult and pediatric patients.",
    packaging: "Vial containing 5g sterile powder",
    storageConditions: "Store below 25°C. Reconstituted solution must be used immediately."
  },
  {
    name: "Tukavo",
    slug: "tukavo",
    composition: "Tucatinib",
    strength: "150mg",
    dosageForm: "Tablets",
    manufacturer: "Zydus",
    catSlug: "targeted-therapy",
    subCategory: "Targeted Therapy",
    form: "Tablet",
    route: "Oral",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/targeted_therapy_pack.png",
    uses: "HER2 tyrosine kinase inhibitor indicated for HER2-positive breast cancer treatment.",
    packaging: "Pack of 30 Tablets",
    storageConditions: "Store below 30°C. Protect from moisture."
  },
  {
    name: "Tucaliv",
    slug: "tucaliv",
    composition: "Tucatinib",
    strength: "150mg",
    dosageForm: "Tablets",
    manufacturer: "Oncology Division",
    catSlug: "targeted-therapy",
    subCategory: "Targeted Therapy",
    form: "Tablet",
    route: "Oral",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/targeted_therapy_pack.png",
    uses: "Kinase inhibitor for metastatic HER2-positive breast cancer, used in combination with trastuzumab and capecitabine.",
    packaging: "60 Tablets per bottle",
    storageConditions: "Keep container tightly closed. Store at 20°C to 25°C."
  },
  {
    name: "Denotec",
    slug: "denotec",
    composition: "Denosumab",
    strength: "120mg",
    dosageForm: "Injection",
    manufacturer: "Oncology Division",
    catSlug: "bone-health",
    subCategory: "Bone Oncology",
    form: "Injection",
    route: "Subcutaneous",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/bone_health_kit.png",
    uses: "RANKL inhibitor indicated for prevention of skeletal-related events in patients with multiple myeloma and bone metastases.",
    packaging: "120 mg/1.7 mL (70 mg/mL) single-dose vial",
    storageConditions: "Store refrigerated at 2°C to 8°C. Do not freeze."
  },
  {
    name: "Abritiga",
    slug: "abritiga",
    composition: "Abiraterone Acetate",
    strength: "250mg",
    dosageForm: "Tablets",
    manufacturer: "OncoZest",
    catSlug: "oncology-medicines",
    subCategory: "Hormonal Therapy",
    form: "Tablet",
    route: "Oral",
    availability: "Prescription Required",
    coldChain: false,
    image: "/products/capsule_bottle.png",
    uses: "CYP17 inhibitor indicated in combination with prednisone for the treatment of patients with metastatic castration-resistant prostate cancer.",
    packaging: "120 Tablets per bottle",
    storageConditions: "Store at 20°C to 25°C (68°F to 77°F); excursions permitted to 15°C to 30°C."
  },
  {
    name: "Hertraz",
    slug: "hertraz",
    composition: "Trastuzumab",
    strength: "440mg",
    dosageForm: "Injection",
    manufacturer: "Mylan",
    catSlug: "oncology-medicines",
    subCategory: "Monoclonal Antibody",
    form: "Injection",
    route: "IV Infusion",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/monoclonal_antibody_pack.png",
    uses: "HER2 receptor antagonist indicated for treatment of HER2-overexpressing breast cancer and metastatic gastric cancer.",
    packaging: "440 mg multi-dose vial with bacteriological water",
    storageConditions: "Store refrigerated at 2°C to 8°C."
  },
  {
    name: "GolimuRel",
    slug: "golimurel",
    composition: "Golimumab",
    strength: "50mg",
    dosageForm: "Injection",
    manufacturer: "Reliance",
    catSlug: "immunotherapy",
    subCategory: "Immunology",
    form: "Injection",
    route: "Subcutaneous",
    availability: "Prescription Required",
    coldChain: true,
    image: "/products/immunotherapy_kit.png",
    uses: "Tumor necrosis factor blocker indicated for active rheumatoid arthritis and psoriatic arthritis.",
    packaging: "50 mg/0.5 mL pre-filled autoinjector",
    storageConditions: "Refrigerate at 2°C to 8°C in original container to protect from light."
  }
];

const seed = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for Seeding...");

    // 1. Clear old data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared old categories and products.");

    // 2. Seed Categories
    const insertedCats = [];
    for (const cat of categoriesData) {
      const c = new Category({
        name: { en: cat.name },
        parentId: null,
        parentName: null,
        slug: cat.slug,
        icon: cat.image,
        description: { en: `${cat.name} Category` },
        status: cat.status
      });
      const saved = await c.save();
      insertedCats.push(saved);
    }
    console.log(`Successfully seeded ${insertedCats.length} categories.`);

    // Map Category Slug -> ID
    const catMap = {};
    insertedCats.forEach(c => {
      catMap[c.slug] = c._id;
    });

    // 3. Seed Products
    const allProducts = productsData.map(p => {
      const catId = catMap[p.catSlug];
      if (!catId) {
        throw new Error(`Category slug ${p.catSlug} not found!`);
      }
      return {
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
        availability: p.availability,
        coldChain: p.coldChain,
        uses: p.uses,
        packaging: p.packaging,
        storageConditions: p.storageConditions,
        price: 0,
        originalPrice: 0,
        basePrice: 0,
        gstPercentage: 12,
        isCombination: false,
        status: "show",
        type: "normal",
        stock: 999
      };
    });

    const insertedProds = await Product.insertMany(allProducts);
    console.log(`Successfully seeded ${insertedProds.length} products.`);

    console.log("Seeding process completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
