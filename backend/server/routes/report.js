const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Report = require('../models/Report');

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads/pdfs');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check file types for both PDF and preview image
    const allowedTypes = {
      'pdf': ['application/pdf'],
      'preview': ['image/jpeg', 'image/png', 'image/gif']
    };

    let fileType;
    if (file.fieldname === 'pdf') {
      fileType = 'pdf';
    } else if (file.fieldname === 'preview') {
      fileType = 'preview';
    }

    if (fileType && allowedTypes[fileType].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${fileType === 'pdf' ? 'PDFs' : 'images'} are allowed`), false);
    }
  }
});

// Upload a new report
router.post('/upload', upload.fields([
  { name: 'pdf', maxCount: 1 }, 
  { name: 'preview', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name } = req.body;
    const pdfFile = req.files['pdf'][0];
    const previewFile = req.files['preview'][0];

    const newReport = new Report({
      name: name,
      pdfPath: `/uploads/pdfs/${pdfFile.filename}`,
      previewImagePath: `/uploads/pdfs/${previewFile.filename}`
    });

    await newReport.save();

    res.status(201).json({
      message: 'Report uploaded successfully',
      report: newReport
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading report', error: error.message });
  }
});

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ uploadedAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

router.get('/pdf/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads/pdfs', req.params.filename);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=report.pdf');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.sendFile(filePath);
});

module.exports = router;