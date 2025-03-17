const User = require('../models/User');
const College = require('../models/Colleges');
const { getCollegeOptions } = require('../utils/collegeUtils');

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

        user.address = address;
        user.age = age;
        user.branch = branch;
        user.college = collegeEntry.name;
        await user.save();

        res.status(200).json({ message: "User details added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding user details", error });
    }
};
