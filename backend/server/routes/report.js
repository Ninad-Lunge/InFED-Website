const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Report = require('../models/Report');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads/pdfs');
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
    const allowedTypes = {
      'pdf': ['application/pdf'],
      'preview': ['image/jpeg', 'image/png', 'image/gif']
    };

    const fileType = file.fieldname === 'pdf' ? 'pdf' : 'preview';
    
    if (allowedTypes[fileType].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${fileType === 'pdf' ? 'PDFs' : 'images'} are allowed`));
    }
  }
});

// Test route to verify the router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Report router is working' });
});

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ uploadedAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
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
    res.status(201).json({ message: 'Report uploaded successfully', report: newReport });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading report', error: error.message });
  }
});

// Update report route - Changed to match frontend request
router.put('/:id', upload.fields([
  { name: 'pdf', maxCount: 1 }, 
  { name: 'preview', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    console.log('Update request received for ID:', id); // Debug log
    console.log('Update data:', { name, files: req.files }); // Debug log

    const existingReport = await Report.findById(id);
    if (!existingReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const updateData = { name };

    if (req.files?.pdf) {
      updateData.pdfPath = `/uploads/pdfs/${req.files.pdf[0].filename}`;
      // Delete old PDF
      if (existingReport.pdfPath) {
        const oldPath = path.join(__dirname, '..', existingReport.pdfPath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    if (req.files?.preview) {
      updateData.previewImagePath = `/uploads/pdfs/${req.files.preview[0].filename}`;
      // Delete old preview
      if (existingReport.previewImagePath) {
        const oldPath = path.join(__dirname, '..', existingReport.previewImagePath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Report updated successfully', report: updatedReport });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Error updating report', error: error.message });
  }
});

// Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Delete files
    if (report.pdfPath) {
      const pdfPath = path.join(__dirname, '..', report.pdfPath);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }

    if (report.previewImagePath) {
      const previewPath = path.join(__dirname, '..', report.previewImagePath);
      if (fs.existsSync(previewPath)) {
        fs.unlinkSync(previewPath);
      }
    }

    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting report', error: error.message });
  }
});

module.exports = router;