const User = require('../models/User');
const College = require('../models/Colleges');
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.addUserDetails = async (req, res) => {
    const { name, email, college, department, bio, skills } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!college) return res.status(400).json({ message: "College name is required" });

        let collegeEntry = await College.findOne({ name: college });
        if (!collegeEntry) {
            collegeEntry = new College({ name: college });
            await collegeEntry.save();
        }

        let imageUrl = user.profileImage || "https://res.cloudinary.com/dvebgf4vr/image/upload/v1743272506/IMG_20231114_130924384_dpdkd7.jpg";
        if (req.file) {
            try {
                imageUrl = await uploadToCloudinary(req.file.buffer, "user_uploads");
            } catch (error) {
                return res.status(500).json({ message: "Failed to upload image", error });
            }
        }
        user.name = name;
        user.additionalDetails.branch = department;
        user.additionalDetails.bio = bio;
        user.additionalDetails.skills = skills;
        user.additionalDetails.college = collegeEntry.name;
        user.profileImage = imageUrl;

        await user.save();

        res.status(200).json({ message: "User details added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding user details", error });
    }
};

