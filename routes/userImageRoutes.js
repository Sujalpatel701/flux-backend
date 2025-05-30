const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage, getImageByEmail } = require("../controllers/userImageController");

const router = express.Router();

// Folder to save images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Upload image route
router.post("/upload", upload.single("image"), uploadImage);

// ✅ New GET route to fetch image by email
router.get("/:email", getImageByEmail);

module.exports = router;
