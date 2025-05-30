const Wallpaper = require("../models/Wallpaper");
const path = require("path");
const fs = require('fs');

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

const getWallpaperCountByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const count = await Wallpaper.countDocuments({ email });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Count error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getWallpaperById = async (req, res) => {
  const { id } = req.params;
  try {
    const wallpaper = await Wallpaper.findById(id);
    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }
    res.json(wallpaper);
  } catch (error) {
    console.error("Get wallpaper by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteWallpaper = async (req, res) => {
  const { id } = req.params;

  try {
    const wallpaper = await Wallpaper.findById(id);
    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }

    const imagePath = path.join(__dirname, "..", "uploads", wallpaper.imageName);

    // Delete image file
    fs.unlink(imagePath, async (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error deleting image file:", err);
        return res.status(500).json({ message: "Failed to delete image file" });
      }

      // Delete document from MongoDB
      await Wallpaper.findByIdAndDelete(id);
      res.status(200).json({ message: "Wallpaper deleted successfully" });
    });

  } catch (error) {
    console.error("Error deleting wallpaper:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  uploadWallpaper,
  getWallpapers,
  getWallpaperCountByEmail,
  getWallpaperById,
  deleteWallpaper, // ✅ add this
};
