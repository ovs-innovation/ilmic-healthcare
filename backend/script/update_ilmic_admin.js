require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const ILMIC_ACCESS_LIST = [
  "dashboard",
  "products",
  "categories",
  "sub-categories",
  "brands",
  "services",
  "faq",
  "leads",
  "settings",
  "edit-profile",
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    const admin = await Admin.findOneAndUpdate(
      { email: "admin@ilmic.com" },
      {
        $set: {
          access_list: ILMIC_ACCESS_LIST,
          status: "Active",
        },
      },
      { new: true }
    );

    if (!admin) {
      await Admin.create({
        name: { en: "ILMIC Admin" },
        email: "admin@ilmic.com",
        password: bcrypt.hashSync("admin123", 10),
        phone: "+918810272080",
        role: "Admin",
        status: "Active",
        access_list: ILMIC_ACCESS_LIST,
        joiningData: new Date(),
      });
      console.log("Created admin@ilmic.com / admin123");
    } else {
      console.log("Updated access_list for admin@ilmic.com");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error updating ILMIC admin:", err);
    process.exit(1);
  }
};

run();
