const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary only if credentials are provided in process.env
const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Uploads a base64 encoded image to Cloudinary (signed) or falls back to local storage
 * @param {string} base64Data - Base64 encoded image string (data:image/...)
 * @param {string} folder - Destination folder on Cloudinary
 * @param {object} req - Express request object (to construct local host URL)
 * @returns {Promise<string>} Secure URL of the uploaded image
 */
const uploadImage = async (base64Data, folder = "product", req) => {
  if (isCloudinaryConfigured()) {
    try {
      const result = await cloudinary.uploader.upload(base64Data, {
        folder: process.env.CLOUDINARY_FOLDER || folder || "ilmic-pharma",
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
      });
      if (result.secure_url) {
        return result.secure_url;
      }
    } catch (err) {
      console.warn("Cloudinary upload failed, falling back to local storage:", err.message);
    }
  }

  // Fallback: Save to local directory
  try {
    const match = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      throw new Error("Invalid base64 image data format");
    }

    const mimeType = match[1];
    const base64Content = match[2];
    const buffer = Buffer.from(base64Content, "base64");

    // Generate unique name
    const ext = mimeType.split("/")[1] || "png";
    const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const uploadDir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    // Construct local URL
    const host = req.get("host") || "localhost:5058";
    const protocol = req.protocol || "http";
    return `${protocol}://${host}/static/uploads/${filename}`;
  } catch (err) {
    throw new Error(`Failed to upload or save image: ${err.message}`);
  }
};

module.exports = {
  uploadImage,
};
