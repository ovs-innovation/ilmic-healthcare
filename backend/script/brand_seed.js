require("dotenv").config();
const mongoose = require("mongoose");
const Brand = require("../models/Brand");

const brands = [
  {
    name: "Lilly",
    slug: "lilly",
    logo: "/brands/lilly.svg",
    featured: true,
    sortOrder: 1,
    status: "show",
  },
  {
    name: "Novo Nordisk",
    slug: "novo-nordisk",
    logo: "/brands/novo-nordisk.svg",
    featured: true,
    sortOrder: 2,
    status: "show",
  },
  {
    name: "AstraZeneca",
    slug: "astrazeneca",
    logo: "/brands/astrazeneca.svg",
    featured: true,
    sortOrder: 3,
    status: "show",
  },
  {
    name: "Astellas",
    slug: "astellas",
    logo: "/brands/astellas.svg",
    featured: true,
    sortOrder: 4,
    status: "show",
  },
  {
    name: "Novartis",
    slug: "novartis",
    logo: "/brands/novartis.svg",
    featured: true,
    sortOrder: 5,
    status: "show",
  },
  {
    name: "Mankind",
    slug: "mankind",
    logo: "/brands/mankind.png",
    featured: true,
    sortOrder: 6,
    status: "show",
  },
  {
    name: "Natco Pharma",
    slug: "natco-pharma",
    logo: "/brands/natco.svg",
    featured: true,
    sortOrder: 7,
    status: "show",
  },
  {
    name: "Bharat Serums",
    slug: "bharat-serums",
    logo: "/brands/bharat-serums.webp",
    featured: true,
    sortOrder: 8,
    status: "show",
  },
  {
    name: "Pfizer",
    slug: "pfizer",
    logo: "/brands/pfizer.svg",
    featured: true,
    sortOrder: 9,
    status: "show",
  },
  {
    name: "Glenmark",
    slug: "glenmark",
    logo: "/brands/glenmark.png",
    featured: true,
    sortOrder: 10,
    status: "show",
  },
];

const seedBrands = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    let created = 0;
    let updated = 0;

    for (const brand of brands) {
      const existing = await Brand.findOne({ slug: brand.slug });
      if (existing) {
        await Brand.updateOne({ _id: existing._id }, { $set: brand });
        updated += 1;
      } else {
        await Brand.create(brand);
        created += 1;
      }
    }

    console.log(`Brands seeded: ${created} created, ${updated} updated`);
    process.exit(0);
  } catch (err) {
    console.error("Brand seed failed:", err.message);
    process.exit(1);
  }
};

seedBrands();
