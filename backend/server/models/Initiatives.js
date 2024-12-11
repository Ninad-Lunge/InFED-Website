const mongoose = require('mongoose');

const initiativeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  objectives: {
    type: [String],
    required: true
  },
  impact: {
    startups: {
      type: Number,
      required: true
    },
    jobs: {
      type: Number,
      required: true
    },
    funding: {
      type: String,
      required: true
    },
    success_rate: {
      type: String,
      required: true
    }
  },
  locations: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Initiative', initiativeSchema);