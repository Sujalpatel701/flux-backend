const mongoose = require("mongoose");

const wallpaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100, // roughly ~10 words
  },
  email: {
    type: String,
    required: true,
  },
  description: String,
  imageName: {
    type: String,
    required: true,
  },
  wallpaperType: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Wallpaper", wallpaperSchema);
