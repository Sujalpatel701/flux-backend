const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadWallpaper, getWallpapers } = require("../controllers/wallpaperController");
const checkWallpaperLimit = require("../middleware/checkWallpaperLimit");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only image formats are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("image"), checkWallpaperLimit, uploadWallpaper);
router.get("/", getWallpapers);

module.exports = router;
