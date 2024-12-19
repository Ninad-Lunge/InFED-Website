const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  pdfPath: {
    type: String,
    required: true
  },
  previewImagePath: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;