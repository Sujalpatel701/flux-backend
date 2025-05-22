const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByWallpaperId,
  deleteComment,
} = require("../controllers/commentController");

// POST: Add comment
router.post("/add", addComment);

// GET: Fetch comments for a wallpaper
router.get("/:wallpaperId", getCommentsByWallpaperId);

// DELETE: Delete comment by ID
router.delete("/:id", deleteComment);

module.exports = router;
