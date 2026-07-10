require("dotenv").config();
const mongoose = require("mongoose");
const Setting = require("../models/Setting");
const ilmicHomepageDefaults = require("../utils/ilmicHomepageDefaults");

const updateHomepage = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Setting.findOneAndUpdate(
    { name: "ilmicHomepageSetting" },
    { $set: { setting: ilmicHomepageDefaults, name: "ilmicHomepageSetting" } },
    { upsert: true }
  );
  console.log("Homepage settings updated with Indian theme & images.");
  process.exit(0);
};

updateHomepage().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
