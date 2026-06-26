const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
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
    therapeuticArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TherapeuticArea",
      required: true,
    },
    banner: {
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

const Disease = mongoose.model("Disease", diseaseSchema);
module.exports = Disease;
