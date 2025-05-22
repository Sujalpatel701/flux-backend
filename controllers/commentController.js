const Comment = require("../models/Comment");

// Add a new comment
const addComment = async (req, res) => {
  const { email, commentText, stars, wallpaperId } = req.body;

  if (!email || !commentText || !stars || !wallpaperId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (stars < 1 || stars > 5) {
    return res.status(400).json({ message: "Stars must be between 1 and 5." });
  }

  try {
    const comment = new Comment({
      email,
      commentText,
      stars,
      wallpaperId,
    });

    await comment.save();
    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get comments for a specific wallpaper
const getCommentsByWallpaperId = async (req, res) => {
  const { wallpaperId } = req.params;

  try {
    const comments = await Comment.find({ wallpaperId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Fetch comments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a comment by its ID
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addComment,
  getCommentsByWallpaperId,
  deleteComment,
};
