const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalVerifiedUsers = await User.countDocuments({ isVerified: true });
        const totalChats = await Chat.countDocuments();
        const totalMessages = await Message.countDocuments();

        const users = await User.find({}, 'name email additionalDetails age googleId isVerified createdAt');

        const usersByCollege = {};
        const usersByBranch = {};
        const ageGroups = {
            'Under 18': 0,
            '18-22': 0,
            '23-26': 0,
            '27-30': 0,
            'Above 30': 0,
            'Unknown': 0
        };
        const signupTrends = {}; // e.g., {'2025-03': 12}
        let googleUsersCount = 0;
        let passwordUsersCount = 0;

        users.forEach(user => {
            const { college = "Unknown", branch = "Unknown", age } = user.additionalDetails || {};

            // College/Branch Grouping
            usersByCollege[college] = (usersByCollege[college] || 0) + 1;
            usersByBranch[branch] = (usersByBranch[branch] || 0) + 1;

            // Google/Password Count
            if (user.googleId) googleUsersCount++;
            else passwordUsersCount++;

            // Age Grouping
            if (!age) ageGroups['Unknown']++;
            else if (age < 18) ageGroups['Under 18']++;
            else if (age <= 22) ageGroups['18-22']++;
            else if (age <= 26) ageGroups['23-26']++;
            else if (age <= 30) ageGroups['27-30']++;
            else ageGroups['Above 30']++;

            // Signup Trends (Month-Year based)
            const monthYear = `${user.createdAt.getFullYear()}-${(user.createdAt.getMonth() + 1)
                .toString()
                .padStart(2, '0')}`; // e.g., "2025-03"
            signupTrends[monthYear] = (signupTrends[monthYear] || 0) + 1;
        });

        res.json({
            totalUsers,
            totalVerifiedUsers,
            totalChats,
            totalMessages,
            googleUsersCount,
            passwordUsersCount,
            usersByCollege,
            usersByBranch,
            ageGroups,
            signupTrends,
            allUsers: users
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};

module.exports = { getDashboardStats, deleteUser };