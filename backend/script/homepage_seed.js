require("dotenv").config();
const mongoose = require("mongoose");
const Setting = require("../models/Setting");
const kureHomepageDefaults = require("../utils/kureHomepageDefaults");

const seedHomepage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const existing = await Setting.findOne({ name: "kureHomepageSetting" });
    if (existing) {
      console.log("Homepage settings already exist — skipping.");
      process.exit(0);
    }

    await Setting.create({
      name: "kureHomepageSetting",
      setting: kureHomepageDefaults,
    });

    console.log("Homepage settings seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Homepage seed failed:", err.message);
    process.exit(1);
  }
};

seedHomepage();
