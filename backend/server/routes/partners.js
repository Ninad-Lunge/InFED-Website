const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
// const bodyParser = require("body-parser");
const Partner = require('../models/Partner');
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("logo"), async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Name and file are required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream({
      folder: "partners",
      resource_type: "image",
    }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Cloudinary upload failed", error });
      }

      // Save to database
      const newPartner = new Partner({
        name,
        logoUrl: result.secure_url,
      });
      await newPartner.save();

      return res.status(201).json({ message: "Partner uploaded successfully", partner: newPartner });
    }).end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch partners
router.get("/get", async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partners" });
  }
});

// Update partner
router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the partner by ID
    const partner = await Partner.findById(id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    // Update name if provided
    if (name) partner.name = name;

    // If a new logo is uploaded, replace the old one
    if (req.file) {
      // Upload the new logo to Cloudinary
      const result = await cloudinary.uploader.upload_stream({
        folder: "partners",
        resource_type: "image",
      }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed", error });
        }

        // Update the logo URL
        partner.logoUrl = result.secure_url;
        await partner.save();

        return res.status(200).json({ message: "Partner updated successfully", partner });
      }).end(req.file.buffer);
    } else {
      // Save updated partner if no new logo is provided
      await partner.save();
      res.status(200).json({ message: "Partner updated successfully", partner });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete partner
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the partner
    const partner = await Partner.findByIdAndDelete(id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;