const { signup, login, resetPassword } = require('../controllers/authController');
const { googleAuth } = require('../config/passport');
const express = require('express');

const router = express.Router();

// API Endpoints
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/google-auth", googleAuth);

module.exports = router;
