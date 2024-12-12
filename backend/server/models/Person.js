const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  heading: {
    type: String,
    trim: true
  },
  socialLinks: {
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    }
  },
  image: {
    type: String  // Store image path or URL
  },
  index: {
    type: Number,
    default: 0,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
