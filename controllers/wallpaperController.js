const Wallpaper = require("../models/Wallpaper");
const path = require("path");

const uploadWallpaper = async (req, res) => {
  const { title, email, description, wallpaperType } = req.body;

  if (!req.file || !email || !title || !wallpaperType) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  // Validate title length
  const wordCount = title.trim().split(/\s+/).length;
  if (wordCount > 10) {
    return res.status(400).json({ message: "Title must not exceed 10 words" });
  }

  try {
    const newWallpaper = new Wallpaper({
      title,
      email,
      description,
      wallpaperType,
      imageName: req.file.filename,
    });

    await newWallpaper.save();
    res.status(201).json({ message: "Wallpaper uploaded", data: newWallpaper });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getWallpapers = async (req, res) => {
  const { email } = req.query;

  try {
    const query = email ? { email } : {};
    const wallpapers = await Wallpaper.find(query).sort({ createdAt: -1 });

    const response = wallpapers.map(wp => ({
      ...wp.toObject(),
      imageUrl: `/uploads/${wp.imageName}`
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadWallpaper, getWallpapers };
