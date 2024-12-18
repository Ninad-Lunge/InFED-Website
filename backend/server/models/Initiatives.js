const mongoose = require("mongoose");

const InitiativesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    about: { type: String, required: true },
    objectives: [{ type: String }],
    locations: [{ type: String }],
    images: [{ type: String }], // URLs for gallery images
    impact: [
      {
        key: { type: String, required: true }, // e.g., 'startups', 'success_rate'
        value: { type: String, required: true }, // e.g., '50', '80%'
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Initiatives", InitiativesSchema);
