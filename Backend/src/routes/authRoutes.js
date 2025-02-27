const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController'); // Keep as an object
const router = express.Router();



// API Endpoints
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);
// Google Authentication Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard'); // Redirect after login
    }
);


module.exports = router;
