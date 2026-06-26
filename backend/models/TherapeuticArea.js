const mongoose = require("mongoose");

const therapeuticAreaSchema = new mongoose.Schema(
  {
    name: {
      type: Object, // Multilingual name
      required: true,
    },
    description: {
      type: Object,
      required: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    banner: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
  },
  {
    timestamps: true,
  }
);

const TherapeuticArea = mongoose.model("TherapeuticArea", therapeuticAreaSchema);
module.exports = TherapeuticArea;
