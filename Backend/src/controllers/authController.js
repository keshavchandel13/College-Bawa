const User = require('../models/User'); // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { oauth2client } = require('../utils/googleConfig');
const axios = require('axios');
require('dotenv').config();


//  Signup Api
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //  validate the inputs
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        let user = await User.findOne({ email });

        // Check if user already exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password only if it exists
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// login APi: 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check User's Existence
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        //Validate Password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Invalid Username or Password"
            })
        }

        //Generate Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        //Send Response with Token
        res.status(200).json({
            message: "Successful Login",
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

// reset-pass APi:
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Check if the token and new password are provided
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        // Find the user by reset token
        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired otp' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database and clear the reset token
        user.password = hashedPassword;
        user.resetToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Forget password
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetToken = resetToken;
        await user.save();

        const resetLink = resetToken;
        const emailSent = await sendEmail(user.email, "Password Reset", `Your OTP is ${resetLink}`);
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send reset otp" });
        }

        console.log('ho gya')
        res.json({ message: "Reset link sent" });
    } catch (error) {
        console.log('nhi ho paya')
        res.status(500).json({ error: error.message });
    }
};

// Google login
exports.googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`

        )
        const { email, name } = userRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email
            })
        }
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({
            message: "Success",
            token,
            user
        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })

    }
}

