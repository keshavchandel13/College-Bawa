const User = require('../models/User');

// Fetch All users (Except the logged in user) --> GET REQUEST
const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user.uid // Firebase Auth middleware
        const users = await User.find({ __id: { $ne: currentUserId } }).select('-password');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "failed to fetch Users" });
    }
};
// Fetch a user by ID --> GET REQUEST
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "failed to fetch user" });
    }
};

//  Update User Profile --> PUT REQUEST
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { additionalDetails: req.body.additionalDetails }, { new: true }).select('-password');
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error:"failed to update user profile"});

    }
};

module.exports = { getAllUsers, getUserById,updateUserProfile }
