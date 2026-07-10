require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Setting = require("../models/Setting");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const ilmicHomepageDefaults = {
  seo: {
    title: "ILMIC Health Care - Oncology, General Pharma & Surgical Products",
    description:
      "ILMIC Health Care Pvt. Ltd. — India's trusted pharmaceutical exporter. Oncology, general pharma, surgical products, medical tourism & hospital management since 2021.",
  },
  hero: {
    enabled: true,
    ctaPrimary: { text: "View Products", link: "/products" },
    ctaSecondary: { text: "Send Enquiry", action: "enquiry" },
    phone: "+91 88102 72080",
    phone2: "+91 92171 74829",
    whatsapp: "918810272080",
    slides: [
      {
        tagline: "ILMIC Health Care Pvt. Ltd.",
        titleLine1: "Trusted Pharmaceutical",
        titleHighlight: "Exporter & Supplier",
        titleLine2: "Since 2021.",
        subtitle: "Oncology, General Pharma & Surgical products — exporting globally.",
        cities: "Delhi (India) · Luanda (Angola) · Global Export Markets",
        bgImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80",
      },
    ],
  },
  popularCategories: {
    enabled: true,
    title: "Product Categories",
    items: [
      { name: "Oncology", category: "Oncology", icon: "🔬" },
      { name: "General Pharma", category: "General Pharma", icon: "💊" },
      { name: "Surgical", category: "Surgical", icon: "🏥" },
    ],
  },
  bottomCta: {
    enabled: true,
    title: "Need Oncology or Pharma Products?",
    subtitle: "Contact us for bulk orders, export enquiries, and hospital supply.",
    phone: "+91 88102 72080",
    phoneHref: "tel:+918810272080",
    enquiryButtonText: "Send Enquiry",
  },
  footer: {
    description: "ILMIC Health Care Pvt. Ltd. — Oncology, general pharma, surgical products, hospital management & medical tourism.",
    phone: "+91 88102 72080",
    phone2: "+91 92171 74829",
    phoneHref: "tel:+918810272080",
    email: "ilmic.healthcare@gmail.com",
    address: "New Delhi, India & Luanda, Republic of Angola",
    hours: "Mon – Sat: 9am – 7pm IST",
    whatsappUrl: "https://wa.me/918810272080",
    copyright: "ILMIC Health Care Pvt. Ltd. All rights reserved.",
    badges: ["Oncology Specialist", "Global Exporter", "Hospital Management"],
  },
};

const categories = [
  { name: { en: "Oncology" }, slug: "oncology", status: "show" },
  { name: { en: "General Pharma" }, slug: "general-pharma", status: "show" },
  { name: { en: "Surgical" }, slug: "surgical", status: "show" },
];

const heroProducts = [
  {
    title: { en: "QLQ 10" },
    slug: "qlq-10",
    description: { en: "Health supplement softgel with Co-Enzyme Q10, L-Arginine, Omega-3, Selenium, Zinc & Lycopene." },
    composition: "Co-Enzyme Q10 300 mg, L-Arginine 250 mg, Omega-3 Fatty Acid 250 mg, Selenium 70 mg, Zinc 20 mg, Lycopene USP 6% 3000 mcg",
    dosageForm: "Softgel Capsule",
    manufacturer: "ILMIC Health Care",
    strength: "Multi-ingredient",
    status: "show",
    isFeatured: true,
    stock: 1000,
    prices: { price: 0, originalPrice: 0 },
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    categorySlug: "general-pharma",
  },
  {
    title: { en: "IMIC ENERGY" },
    slug: "imic-energy",
    description: { en: "Energy & vitality capsules with L-Arginine, Epimedium, Ashwagandha, Moringa, Tribulus & more." },
    composition: "L-Arginine 100 mg, Epimedium Extract 70 mg, Zinc 7.5 mg, Withania Somnifera 50 mg, Asphaltum Punjabianum 50 mg, Chlorophytum Borivilianum 100 mg, Moringa Extract 50 mg, Lepidium Extract 40 mg, Tribulus Terrestris 50 mg, Ginkgo Biloba 40 mg, Mucuna Pruriens 35 mg, Yohimbe Bark 5 mg",
    dosageForm: "Capsules",
    manufacturer: "ILMIC Health Care",
    status: "show",
    isFeatured: true,
    stock: 1000,
    prices: { price: 0, originalPrice: 0 },
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80",
    categorySlug: "general-pharma",
  },
  {
    title: { en: "CTUXIL 500" },
    slug: "ctuxil-500",
    description: { en: "Cefuroxime Axetil antibiotic tablet 500 mg." },
    composition: "Cefuroxime Axetil 500 mg",
    dosageForm: "Tablet",
    manufacturer: "ILMIC Health Care",
    strength: "500 mg",
    status: "show",
    isFeatured: true,
    stock: 1000,
    prices: { price: 0, originalPrice: 0 },
    image: "https://images.unsplash.com/photo-1587854692152-cf240469e97e?w=600&q=80",
    categorySlug: "general-pharma",
  },
  {
    title: { en: "ABIRAMIC 250" },
    slug: "abiramic-250",
    description: { en: "Abiraterone Acetate 250 mg tablet for prostate cancer treatment." },
    composition: "Abiraterone Acetate 250 mg",
    dosageForm: "Tablet",
    manufacturer: "ILMIC Health Care",
    strength: "250 mg",
    status: "show",
    isFeatured: true,
    stock: 500,
    prices: { price: 0, originalPrice: 0 },
    image: "https://images.unsplash.com/photo-1579686315136-48def1d9c40f?w=600&q=80",
    categorySlug: "oncology",
  },
  {
    title: { en: "PACMIC 300" },
    slug: "pacmic-300",
    description: { en: "Paclitaxel 300 mg injection for oncology treatment." },
    composition: "Paclitaxel 300 mg",
    dosageForm: "Injection",
    manufacturer: "ILMIC Health Care",
    strength: "300 mg",
    status: "show",
    isFeatured: true,
    stock: 500,
    prices: { price: 0, originalPrice: 0 },
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    categorySlug: "oncology",
  },
];

const services = [
  { name: { en: "Pharmaceutical Export" }, slug: "pharmaceutical-export", description: { en: "Export of oncology and general pharma to Dubai, Africa, Bangladesh, CIS." }, icon: "🌍", group: "Export", status: "show" },
  { name: { en: "Hospital Management" }, slug: "hospital-management", description: { en: "Managing 50+ hospitals abroad with effective on-ground support." }, icon: "🏥", group: "Hospital", status: "show" },
  { name: { en: "Medical Tourism" }, slug: "medical-tourism", description: { en: "Complete medical tourism services for international patients in India." }, icon: "✈️", group: "Medical Tourism", status: "show" },
  { name: { en: "Doctors on Call" }, slug: "doctors-on-call", description: { en: "Specialist doctors on call for critical surgeries worldwide." }, icon: "👨‍⚕️", group: "Medical", status: "show" },
  { name: { en: "International Medical Conferences" }, slug: "international-medical-conferences", description: { en: "Conducting international medical conferences and training programs." }, icon: "🎓", group: "Training", status: "show" },
  { name: { en: "Hospital Accessories Supply" }, slug: "hospital-accessories-supply", description: { en: "Supplier of any type of hospital accessories and surgical products." }, icon: "🔧", group: "Surgical", status: "show" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected:", mongoose.connection.db.databaseName);

    await Category.deleteMany({});
    const insertedCats = await Category.insertMany(categories);
    const catMap = {};
    insertedCats.forEach((c) => { catMap[c.slug] = c._id; });

    const products = heroProducts.map((p) => {
      const { categorySlug, isFeatured, ...rest } = p;
      return { ...rest, category: catMap[categorySlug], categories: [catMap[categorySlug]], isCombination: false, image: [p.image] };
    });
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} hero products`);

    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services`);

    const existing = await Setting.findOne({ name: "ilmicHomepageSetting" });
    if (existing) {
      existing.setting = { ...existing.setting, ...ilmicHomepageDefaults };
      await existing.save();
    } else {
      await Setting.create({ name: "ilmicHomepageSetting", setting: ilmicHomepageDefaults });
    }
    console.log("Homepage settings updated for ILMIC");

    const adminExists = await Admin.findOne({ email: "admin@ilmic.com" });
    if (!adminExists) {
      await Admin.create({
        name: { en: "ILMIC Admin" },
        email: "admin@ilmic.com",
        password: bcrypt.hashSync("admin123", 10),
        phone: "+918810272080",
        role: "Admin",
        joiningDate: new Date(),
      });
      console.log("Admin: admin@ilmic.com / admin123");
    }

    console.log("\n✅ ILMIC database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
