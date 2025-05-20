const mongoose = require("mongoose");

const userImageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("UserImage", userImageSchema);
