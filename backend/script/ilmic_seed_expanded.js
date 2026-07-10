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

// Generate 90 realistic wholesale B2B oncology/critical care/specialty medicines
const medicinesList = [
  // oncology-medicines
  { name: "Midostar", composition: "Midostaurin", strength: "25mg", dosageForm: "Soft Gelatin Capsules", manufacturer: "Novartis", catSlug: "oncology-medicines", form: "Capsules", route: "Oral", image: "/products/capsule_bottle.png" },
  { name: "Intazumab", composition: "Pertuzumab", strength: "420mg/14ml", dosageForm: "Injection", manufacturer: "Intas", catSlug: "oncology-medicines", form: "Injection", route: "IV Infusion", image: "/products/hertuma.png" },
  { name: "Ibruzee", composition: "Ibrutinib", strength: "140mg", dosageForm: "Capsules", manufacturer: "Zee Laboratories", catSlug: "oncology-medicines", form: "Capsule", route: "Oral", image: "/products/brukinsa.png" },
  { name: "Mediopa", composition: "Thiotepa", strength: "100mg", dosageForm: "Injection", manufacturer: "Oncology Division", catSlug: "oncology-medicines", form: "Injection", route: "IV / Intracavitary", image: "/products/injection_vial.png" },
  { name: "Treoall", composition: "Treosulfan", strength: "5gm", dosageForm: "Injection", manufacturer: "Medac", catSlug: "oncology-medicines", form: "Injection", route: "IV Infusion", image: "/products/injection_vial.png" },
  { name: "Carzomib", composition: "Carfilzomib", strength: "60mg", dosageForm: "Injection", manufacturer: "Amgen", catSlug: "oncology-medicines", form: "Injection", route: "IV Infusion", image: "/products/darzalex.png" },
  { name: "Abritiga", composition: "Abiraterone Acetate", strength: "250mg", dosageForm: "Tablets", manufacturer: "OncoZest", catSlug: "oncology-medicines", form: "Tablet", route: "Oral", image: "/products/lorbriqua.png" },
  { name: "Hertraz", composition: "Trastuzumab", strength: "440mg", dosageForm: "Injection", manufacturer: "Mylan", catSlug: "oncology-medicines", form: "Injection", route: "IV Infusion", image: "/products/hertuma.png" },
  
  // anti-cancer-drugs
  { name: "Kryxana", composition: "Ribociclib", strength: "200mg", dosageForm: "Tablets", manufacturer: "Novartis", catSlug: "anti-cancer-drugs", form: "Tablets", route: "Oral", image: "/products/kryxana.png" },
  { name: "Tagrisso", composition: "Osimertinib", strength: "80mg", dosageForm: "Tablets", manufacturer: "AstraZeneca", catSlug: "anti-cancer-drugs", form: "Tablets", route: "Oral", image: "/products/tagrisso.png" },
  { name: "Venclexta", composition: "Venetoclax", strength: "100mg", dosageForm: "Tablets", manufacturer: "AbbVie", catSlug: "anti-cancer-drugs", form: "Tablets", route: "Oral", image: "/products/venclexta.png" },
  { name: "Xospata", composition: "Gilteritinib", strength: "40mg", dosageForm: "Tablets", manufacturer: "Astellas", catSlug: "anti-cancer-drugs", form: "Tablets", route: "Oral", image: "/products/xospata.png" },
  { name: "Brukinsa", composition: "Zanubrutinib", strength: "80mg", dosageForm: "Capsules", manufacturer: "BeiGene", catSlug: "anti-cancer-drugs", form: "Capsules", route: "Oral", image: "/products/brukinsa.png" },
  { name: "Adcetris", composition: "Brentuximab Vedotin", strength: "50mg", dosageForm: "Injection", manufacturer: "Takeda", catSlug: "anti-cancer-drugs", form: "Injection", route: "IV Infusion", image: "/products/adcetris.png" },
  
  // targeted-therapy
  { name: "Tucanat", composition: "Tucatinib", strength: "150mg", dosageForm: "Tablets", manufacturer: "Natco", catSlug: "targeted-therapy", form: "Tablet", route: "Oral", image: "/products/xospata.png" },
  { name: "Tukavo", composition: "Tucatinib", strength: "150mg", dosageForm: "Tablets", manufacturer: "Zydus", catSlug: "targeted-therapy", form: "Tablet", route: "Oral", image: "/products/tagrisso.png" },
  { name: "Tucaliv", composition: "Tucatinib", strength: "150mg", dosageForm: "Tablets", manufacturer: "Oncology Division", catSlug: "targeted-therapy", form: "Tablet", route: "Oral", image: "/products/crizalk.png" },
  { name: "Lenvat", composition: "Lenvatinib", strength: "10mg", dosageForm: "Capsules", manufacturer: "Eisai", catSlug: "targeted-therapy", form: "Capsules", route: "Oral", image: "/products/lynparza.png" },
  { name: "Erlonat", composition: "Erlotinib", strength: "150mg", dosageForm: "Tablets", manufacturer: "Natco", catSlug: "targeted-therapy", form: "Tablets", route: "Oral", image: "/products/capsule_bottle.png" },
  { name: "Geftinat", composition: "Gefitinib", strength: "250mg", dosageForm: "Tablets", manufacturer: "Natco", catSlug: "targeted-therapy", form: "Tablets", route: "Oral", image: "/products/targeted_therapy_pack.png" },
  { name: "Sorafenat", composition: "Sorafenib", strength: "200mg", dosageForm: "Tablets", manufacturer: "Natco", catSlug: "targeted-therapy", form: "Tablets", route: "Oral", image: "/products/capsule_bottle.png" },
  
  // immunotherapy
  { name: "Tishta", composition: "Nivolumab", strength: "100mg/10ml", dosageForm: "Injection", manufacturer: "Zydus", catSlug: "immunotherapy", form: "Injection", route: "IV Infusion", image: "/products/adcetris.png" },
  { name: "GolimuRel", composition: "Golimumab", strength: "50mg", dosageForm: "Injection", manufacturer: "Reliance", catSlug: "immunotherapy", form: "Injection", route: "Subcutaneous", image: "/products/ramiven.png" },
  { name: "Keytruda", composition: "Pembrolizumab", strength: "100mg/4ml", dosageForm: "Injection", manufacturer: "MSD", catSlug: "immunotherapy", form: "Injection", route: "IV Infusion", image: "/products/immunotherapy_kit.png" },
  { name: "Opdivo", composition: "Nivolumab", strength: "40mg/4ml", dosageForm: "Injection", manufacturer: "BMS", catSlug: "immunotherapy", form: "Injection", route: "IV Infusion", image: "/products/adcetris.png" },
  { name: "Imfinzi", composition: "Durvalumab", strength: "500mg/10ml", dosageForm: "Injection", manufacturer: "AstraZeneca", catSlug: "immunotherapy", form: "Injection", route: "IV Infusion", image: "/products/immunotherapy_kit.png" },
  
  // bone-health
  { name: "DenosteoRel", composition: "Denosumab", strength: "60mg", dosageForm: "Injection", manufacturer: "Reliance", catSlug: "bone-health", form: "Injection", route: "Subcutaneous", image: "/products/bone_health_kit.png" },
  { name: "Denotec", composition: "Denosumab", strength: "120mg", dosageForm: "Injection", manufacturer: "Oncology Division", catSlug: "bone-health", form: "Injection", route: "Subcutaneous", image: "/products/bone_health_kit.png" },
  { name: "Prolia", composition: "Denosumab", strength: "60mg/ml", dosageForm: "Injection", manufacturer: "Amgen", catSlug: "bone-health", form: "Injection", route: "Subcutaneous", image: "/products/bone_health_kit.png" },
  { name: "Xgeva", composition: "Denosumab", strength: "120mg/1.7ml", dosageForm: "Injection", manufacturer: "Amgen", catSlug: "bone-health", form: "Injection", route: "Subcutaneous", image: "/products/bone_health_kit.png" },
  { name: "Zoldria", composition: "Zoledronic Acid", strength: "4mg/5ml", dosageForm: "Injection", manufacturer: "Cipla", catSlug: "bone-health", form: "Injection", route: "IV Infusion", image: "/products/injection_vial.png" },
  
  // critical-care
  { name: "Somalinx LAR", composition: "Octreotide", strength: "30mg", dosageForm: "Injection", manufacturer: "Emcure", catSlug: "critical-care", form: "Injection", route: "IM Injection", image: "/products/critical_care_injection.png" },
  { name: "Merocrit", composition: "Meropenem", strength: "1gm", dosageForm: "Injection", manufacturer: "Cipla", catSlug: "critical-care", form: "Injection", route: "IV Infusion", image: "/products/critical_care_injection.png" },
  { name: "Piptaz", composition: "Piperacillin & Tazobactam", strength: "4.5gm", dosageForm: "Injection", manufacturer: "Lupin", catSlug: "critical-care", form: "Injection", route: "IV Infusion", image: "/products/critical_care_injection.png" },
  { name: "Vasocare", composition: "Vasopressin", strength: "20 units/ml", dosageForm: "Injection", manufacturer: "Samarth", catSlug: "critical-care", form: "Injection", route: "IV Infusion", image: "/products/critical_care_injection.png" },
  { name: "Norad", composition: "Noradrenaline", strength: "2mg/ml", dosageForm: "Injection", manufacturer: "Neon", catSlug: "critical-care", form: "Injection", route: "IV Infusion", image: "/products/critical_care_injection.png" },
  
  // nephrology-medicines
  { name: "Erythropen", composition: "Erythropoietin", strength: "4000 IU", dosageForm: "Injection", manufacturer: "Bharat Serums", catSlug: "nephrology-medicines", form: "Injection", route: "Subcutaneous / IV", image: "/products/ramiven.png" },
  { name: "Darbepoetin Alfa", composition: "Darbepoetin Alfa", strength: "40mcg", dosageForm: "Injection", manufacturer: "Dr. Reddy's", catSlug: "nephrology-medicines", form: "Injection", route: "Subcutaneous", image: "/products/ramiven.png" },
  { name: "Renvela", composition: "Sevelamer Carbonate", strength: "800mg", dosageForm: "Tablets", manufacturer: "Sanofi", catSlug: "nephrology-medicines", form: "Tablets", route: "Oral", image: "/products/capsule_bottle.png" },
  { name: "Tacromus", composition: "Tacrolimus", strength: "1mg", dosageForm: "Capsules", manufacturer: "Panacea", catSlug: "nephrology-medicines", form: "Capsules", route: "Oral", image: "/products/capsule_bottle.png" },
  
  // hiv-medicines
  { name: "Tafero EM", composition: "Tenofovir Alafenamide & Emtricitabine", strength: "25mg/200mg", dosageForm: "Tablets", manufacturer: "Hetero", catSlug: "hiv-medicines", form: "Tablets", route: "Oral", image: "/products/hiv.png" },
  { name: "Viraday", composition: "Tenofovir & Emtricitabine & Efavirenz", strength: "300mg/200mg/600mg", dosageForm: "Tablets", manufacturer: "Cipla", catSlug: "hiv-medicines", form: "Tablets", route: "Oral", image: "/products/hiv.png" },
  { name: "Dolutegravir", composition: "Dolutegravir", strength: "50mg", dosageForm: "Tablets", manufacturer: "Mylan", catSlug: "hiv-medicines", form: "Tablets", route: "Oral", image: "/products/hiv.png" },
  
  // lifesaving-medicines
  { name: "Adrelin", composition: "Adrenaline", strength: "1mg/ml", dosageForm: "Injection", manufacturer: "Neon", catSlug: "lifesaving-medicines", form: "Injection", route: "IM/IV", image: "/products/lifesaving_emergency_box.png" },
  { name: "Atropin", composition: "Atropine", strength: "0.6mg/ml", dosageForm: "Injection", manufacturer: "Neon", catSlug: "lifesaving-medicines", form: "Injection", route: "IV/IM", image: "/products/lifesaving_emergency_box.png" },
  { name: "Cordarone", composition: "Amiodarone", strength: "150mg/3ml", dosageForm: "Injection", manufacturer: "Sanofi", catSlug: "lifesaving-medicines", form: "Injection", route: "IV Infusion", image: "/products/lifesaving_emergency_box.png" },
  { name: "Solu-Medrol", composition: "Methylprednisolone", strength: "125mg", dosageForm: "Injection", manufacturer: "Pfizer", catSlug: "lifesaving-medicines", form: "Injection", route: "IV/IM", image: "/products/lifesaving_emergency_box.png" },
  { name: "Trenaxa", composition: "Tranexamic Acid", strength: "500mg", dosageForm: "Injection", manufacturer: "Macleods", catSlug: "lifesaving-medicines", form: "Injection", route: "IV", image: "/products/lifesaving_emergency_box.png" }
];

// Dynamically generate another 60 unique medicines to bring the total to 100+
const genericNames = [
  "Cisplatin", "Paclitaxel", "Doxorubicin", "Gemcitabine", "Oxaliplatin", "Docetaxel", 
  "Imatinib", "Erlotinib", "Gefitinib", "Bortezomib", "Rituximab", "Bevacizumab", 
  "Pembrolizumab", "Trastuzumab", "Azacitidine", "Decitabine", "Lenalidomide", "Pomalidomide"
];

const brandPrefixes = [
  "Onco", "Cura", "Cis", "Pacli", "Doxo", "Gem", "Oxali", "Docet", "Imat", "Erlo", 
  "Gef", "Bort", "Ritu", "Beva", "Pembro", "Trastu", "Aza", "Deci", "Lena", "Poma"
];

const manufacturersList = [
  "Dr. Reddy's", "Cipla Oncology", "Sun Pharma", "Natco Pharma", "Biocon", 
  "Reliance Life Sciences", "Novartis", "Pfizer Oncology", "AstraZeneca", "Roche"
];

const strengthOptions = ["50mg", "100mg", "150mg", "200mg", "250mg", "400mg", "500mg"];
const categoryMap = {
  "oncology-medicines": "Oncology Medicines",
  "anti-cancer-drugs": "Anti Cancer Drugs",
  "critical-care": "Critical Care",
  "immunotherapy": "Immunotherapy",
  "targeted-therapy": "Targeted Therapy",
  "hematology": "Hematology",
  "bone-health": "Bone Health",
  "injectable-medicines": "Injectable Medicines",
  "oral-medicines": "Oral Medicines",
  "imported-medicines": "Imported Medicines",
  "hiv-medicines": "HIV Medicines",
  "nephrology-medicines": "Nephrology Medicines",
  "lifesaving-medicines": "Lifesaving Medicines"
};

const subCategoryMap = {
  "oncology-medicines": "Monoclonal Antibody",
  "anti-cancer-drugs": "Chemotherapy",
  "critical-care": "ICU Support",
  "immunotherapy": "Biologics",
  "targeted-therapy": "Kinase Inhibitors",
  "hematology": "Blood Specialist",
  "bone-health": "Osteo Support",
  "injectable-medicines": "Injectables",
  "oral-medicines": "Oral Therapeutics",
  "imported-medicines": "Specialty Imports",
  "hiv-medicines": "Antivirals",
  "nephrology-medicines": "Renal Care",
  "lifesaving-medicines": "Emergency Lifesaving"
};

const imagesList = [
  "/products/adcetris.png",
  "/products/brukinsa.png",
  "/products/crizalk.png",
  "/products/darzalex.png",
  "/products/hertuma.png",
  "/products/hiv.png",
  "/products/imported.png",
  "/products/kryxana.png",
  "/products/lorbriqua.png",
  "/products/lynparza.png",
  "/products/ramiven.png",
  "/products/tagrisso.png",
  "/products/venclexta.png",
  "/products/xospata.png"
];

// Generate extra products
for (let i = 0; i < 70; i++) {
  const brandIndex = i % brandPrefixes.length;
  const genIndex = i % genericNames.length;
  const mfgIndex = i % manufacturersList.length;
  const catKeys = Object.keys(categoryMap);
  const catKey = catKeys[i % catKeys.length];
  
  const isOral = catKey.includes("oral") || i % 2 === 0;
  
  medicinesList.push({
    name: `${brandPrefixes[brandIndex]}${i + 10}`,
    composition: genericNames[genIndex],
    strength: strengthOptions[i % strengthOptions.length],
    dosageForm: isOral ? "Tablets" : "Injection",
    manufacturer: manufacturersList[mfgIndex],
    catSlug: catKey,
    form: isOral ? "Tablet" : "Injection",
    route: isOral ? "Oral" : "IV Infusion",
    image: imagesList[i % imagesList.length]
  });
}

const seed = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for Expanded Seeding...");

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
    const allProducts = medicinesList.map((p, idx) => {
      const catId = catMap[p.catSlug];
      if (!catId) {
        throw new Error(`Category slug ${p.catSlug} not found!`);
      }
      
      const slugName = p.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      
      return {
        title: { en: p.name },
        slug: slugName,
        description: { en: `Indicated for professional therapeutic administration. For complete treatment guidelines, storage instructions, and clinical studies, refer to the manufacturer documentation for ${p.name} (${p.composition}).` },
        category: catId,
        categories: [catId],
        image: [p.image],
        composition: p.composition,
        strength: p.strength,
        dosageForm: p.dosageForm,
        manufacturer: p.manufacturer,
        subCategory: subCategoryMap[p.catSlug] || "Specialty Medicine",
        form: p.form,
        route: p.route,
        availability: "Prescription Required",
        coldChain: p.form === "Injection",
        uses: `Approved formulation of ${p.composition} indicated for indicated clinical therapeutic regimens.`,
        packaging: p.form === "Injection" ? "Single-dose vials with protective carton packaging" : "Bottles or blister strips",
        storageConditions: p.form === "Injection" ? "Store refrigerated between 2°C and 8°C. Do not freeze." : "Store below 25°C in a dry environment.",
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
