const UserImage = require("../models/UserImage");

// Upload image (already working)
const uploadImage = async (req, res) => {
  const { email } = req.body;

  if (!email || !req.file) {
    return res.status(400).json({ message: "Email and image are required" });
  }

  try {
    const newEntry = new UserImage({
      email,
      imageName: req.file.filename,
    });

    await newEntry.save();

    res.status(201).json({ message: "Image uploaded successfully", data: newEntry });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ New: Fetch image by email
const getImageByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const imageEntry = await UserImage.findOne({ email });

    if (!imageEntry) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    res.json({
      email: imageEntry.email,
      imageUrl: `/uploads/${imageEntry.imageName}`,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadImage, getImageByEmail };
