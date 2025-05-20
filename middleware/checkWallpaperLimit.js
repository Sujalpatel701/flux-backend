const Wallpaper = require("../models/Wallpaper");

const checkWallpaperLimit = async (req, res, next) => {
  const { email } = req.body;

  try {
    const count = await Wallpaper.countDocuments({ email });
    if (count >= 5) {
      return res.status(400).json({ message: "Upload limit (5) reached for this user" });
    }
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkWallpaperLimit;
