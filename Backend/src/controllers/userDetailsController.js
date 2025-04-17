const User = require('../models/User');
const College = require('../models/Colleges');
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.addUserDetails = async (req, res) => {
    const { name, email, college, department, bio, skills } = req.body;
    console.log("in add user");
    console.log("REQ FILE:", req.file);
    console.log(name, email, college, department, bio, skills);

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
        console.log(req.file)
        if (req.file) {
            console.log("image to be uploaded");
            imageUrl = await uploadToCloudinary(req.file.buffer, "user_uploads");
            console.log("image uploaded");
        }

        user.name = name;
        user.department = department;
        user.bio = bio;
        user.skills = skills;
        user.college = collegeEntry.name;
        user.profileImage = imageUrl;
        console.log("USER:   ",user);
        await user.save();

        res.status(200).json({ message: "User details added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding user details", error });
    }
};

