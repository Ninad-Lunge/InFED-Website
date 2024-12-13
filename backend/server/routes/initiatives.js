const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Initiative = require("../models/Initiatives");

// Multer configuration for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Reusable function to upload images to Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const imageUrls = [];
  for (const file of files) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "initiatives",
    });
    imageUrls.push(uploadResponse.secure_url);
  }
  return imageUrls;
};

// Add new initiative
router.post("/add-initiative", upload.array("images", 3), async (req, res) => {
  try {
    let impact = [];
    try {
      impact = JSON.parse(req.body.impact || "[]");
    } catch (parseError) {
      return res
        .status(400)
        .json({ error: "Invalid JSON format in impact field." });
    }

    // Validate exactly 4 impact items
    if (!Array.isArray(impact) || impact.length !== 4) {
      return res
        .status(400)
        .json({ error: "You must provide exactly 4 impact items." });
    }

    if (
      impact.some(
        (item) => typeof item !== "object" || !item.key || !item.value
      )
    ) {
      return res
        .status(400)
        .json({
          error: "Invalid impact format. Each item must have a key and value.",
        });
    }

    const imageUrls =
      req.files?.length > 0 ? await uploadImagesToCloudinary(req.files) : [];
    const newInitiative = new Initiative({
      title: req.body.title,
      about: req.body.about || "",
      locations: JSON.parse(req.body.locations || "[]"),
      objectives: JSON.parse(req.body.objectives || "[]"),
      impact,
      images: imageUrls,
    });

    const savedInitiative = await newInitiative.save();
    res.status(201).json(savedInitiative);
  } catch (error) {
    console.error("Error adding initiative:", error);
    res.status(500).json({
      error: "Failed to add initiative",
      details: error.message,
    });
  }
});

// Get all initiatives
router.get("/get-initiatives", async (req, res) => {
  try {
    const initiatives = await Initiative.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json(initiatives);
  } catch (error) {
    console.error("Error fetching initiatives:", error);
    res.status(500).json({
      error: "Failed to fetch initiatives",
      details: error.message,
    });
  }
});

// Update an existing initiative
router.put(
  "/update-initiatives/:id",
  upload.array("images", 3),
  async (req, res) => {
    try {
      const { id } = req.params;
      let impact = [];
      try {
        impact = JSON.parse(req.body.impact || "[]");
      } catch (parseError) {
        return res
          .status(400)
          .json({ error: "Invalid JSON format in impact field." });
      }

      // Validate exactly 4 impact items
      if (!Array.isArray(impact) || impact.length !== 4) {
        return res
          .status(400)
          .json({ error: "You must provide exactly 4 impact items." });
      }

      if (
        impact.some(
          (item) => typeof item !== "object" || !item.key || !item.value
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid impact format. Each item must have a key and value.",
          });
      }

      const existingInitiative = await Initiative.findById(id);
      if (!existingInitiative) {
        return res.status(404).json({ error: "Initiative not found." });
      }

      const newImageUrls =
        req.files?.length > 0 ? await uploadImagesToCloudinary(req.files) : [];
      existingInitiative.images =
        newImageUrls.length > 0 ? newImageUrls : existingInitiative.images;
      existingInitiative.title = req.body.title || existingInitiative.title;
      existingInitiative.about = req.body.about || existingInitiative.about;
      existingInitiative.locations = JSON.parse(req.body.locations || "[]");
      existingInitiative.objectives = JSON.parse(req.body.objectives || "[]");
      existingInitiative.impact = impact;

      const updatedInitiative = await existingInitiative.save();
      res.json(updatedInitiative);
    } catch (error) {
      console.error("Error updating initiative:", error);
      res.status(500).json({
        error: "Failed to update initiative",
        details: error.message,
      });
    }
  }
);

// Delete an initiative
router.delete("/delete-initiatives/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const initiativeToDelete = await Initiative.findById(id);
    if (!initiativeToDelete) {
      return res.status(404).json({ error: "Initiative not found" });
    }

    // Delete associated images from Cloudinary
    if (initiativeToDelete.images && initiativeToDelete.images.length > 0) {
      for (const imageUrl of initiativeToDelete.images) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`initiatives/${publicId}`);
      }
    }

    await initiativeToDelete.deleteOne();
    res.json({ message: "Initiative deleted successfully" });
  } catch (error) {
    console.error("Error deleting initiative:", error);
    res.status(500).json({
      error: "Failed to delete initiative",
      details: error.message,
    });
  }
});

module.exports = router;
