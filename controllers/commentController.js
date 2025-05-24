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

// Delete all comments for a specific wallpaper ID
const deleteComment = async (req, res) => {
  const { id } = req.params; // 'id' now refers to wallpaperId

  try {
    const result = await Comment.deleteMany({ wallpaperId: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No comments found for this wallpaper" });
    }

    res.status(200).json({ message: "All comments deleted", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Delete comments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  addComment,
  getCommentsByWallpaperId,
  deleteComment,
};
