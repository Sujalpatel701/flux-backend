const express = require("express");
const { getAllUsers, getUsernameByEmail } = require("../controllers/userController");

const router = express.Router();

// Route to get all users
router.get("/all", getAllUsers);

// Route to get username by email
router.post("/name", getUsernameByEmail);

module.exports = router;
