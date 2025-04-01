const User = require('../models/User');
const College = require('../models/Colleges');
const { getCollegeOptions } = require('../utils/collegeUtils');
const fs = require("fs")
const uploadToCloudinary = require("../utils/uploadToCloudinary")

exports.getCollegeOptions = async (req, res) => {
    const { email } = req.body;
    const collegeData = await getCollegeOptions(email);
    res.status(200).json(collegeData);
};

exports.addUserDetails = async (req, res) => {
    const { email, address, age, branch, college } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!college) return res.status(400).json({ message: "College name is required" });

        // If college is not in our DB, add it
        let collegeEntry = await College.findOne({ name: college });
        if (!collegeEntry) {
            collegeEntry = new College({ name: college });
            await collegeEntry.save();
        }

        let imageUrl = user.profileImage || "https://res.cloudinary.com/dvebgf4vr/image/upload/v1743272506/IMG_20231114_130924384_dpdkd7.jpg"; //Default image incase of no image uploaded
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.path, "user_uploads");
            fs.unlinkSync(req.file.path);
        }


        user.address = address;
        user.age = age;
        user.branch = branch;
        user.college = collegeEntry.name;
        user.profileImage = imageUrl;
        await user.save();

        res.status(200).json({ message: "User details added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding user details", error });
    }
};
