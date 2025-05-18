const express = require("express");
const router = express.Router();

const { validateSignup, validateLogin } = require("../middleware/validateInput");
const { signup, login } = require("../controllers/authController");

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

module.exports = router;
