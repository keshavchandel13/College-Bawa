const User = require('../models/User');
// Fetch All users (Except the logged in user) --> GET REQUEST with search query
const getAllUsers = async (req, res) => {
    try {
      const { query } = req.query;
  
      const searchFilter = query
        ? {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } },
            ],
          }
        : {};
  
      const users = await User.find(searchFilter).select("-password");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

// Fetch a user by ID --> GET REQUEST
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// Update User Profile --> PUT REQUEST
// Update User Profile --> PUT REQUEST
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { additionalDetails: req.body.additionalDetails },
            { new: true } // To return the updated document
        ).select('-password');

        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user profile" });
    }
};


module.exports = { getAllUsers, getUserById, updateUserProfile };
