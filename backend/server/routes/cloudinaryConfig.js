// Import required libraries
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;

module.exports.config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    try {
      const result = await cloudinary.uploader.upload(files.file.filepath, {
        folder: 'persons',
        // Remove upload_preset if using signed upload
      });

      // Return the secure URL of the uploaded image
      return res.status(200).json({
        message: 'Upload successful',
        imageUrl: result.secure_url,
      });
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({
        message: 'Cloudinary upload failed',
        error: uploadError.message,
      });
    }
  });
}