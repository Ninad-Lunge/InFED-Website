const mongoose = require('mongoose');

const InitiativesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  about: { type: String, required: true },
  objectives: [{ type: String }],
  locations: [{ type: String }],
  images: [{ type: String }], // URLs for gallery images
}, { timestamps: true }); // Added timestamps for created/updated tracking

module.exports = mongoose.model('Initiatives', InitiativesSchema);