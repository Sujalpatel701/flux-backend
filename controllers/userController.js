const User = require("../models/User");

// GET /api/user/all
const getAllUsers = async (req, res) => {
  try {
    // Only include username and email
    const users = await User.find({}, { _id: 0, username: 1, email: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



// POST /api/user/name
const getUsernameByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email }, { _id: 0, username: 1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getAllUsers,
  getUsernameByEmail,
};
