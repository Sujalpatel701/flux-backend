const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  wallpaperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallpaper',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
