require("dotenv").config();
const mongoose = require("mongoose");
const Setting = require("../models/Setting");
const { ILMIC_EMAIL } = require("../lib/email-sender/emailConfig");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const settings = await Setting.find({
      name: { $in: ["ilmicHomepageSetting", "storeCustomizationSetting"] },
    });

    for (const doc of settings) {
      if (!doc.setting) continue;

      if (doc.setting.footer) {
        doc.setting.footer.email = ILMIC_EMAIL;
      }
      if (doc.setting.bottomCta) {
        doc.setting.bottomCta.email = ILMIC_EMAIL;
      }
      if (doc.setting.navbar) {
        doc.setting.navbar.email = ILMIC_EMAIL;
      }

      doc.markModified("setting");
      await doc.save();
      console.log(`Updated email in ${doc.name}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Failed to update settings email:", err.message);
    process.exit(1);
  }
};

run();
