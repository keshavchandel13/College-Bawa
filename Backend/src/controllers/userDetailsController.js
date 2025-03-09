const User = require('../models/User');
const College = require('../models/College');
const { getCollegeOptions, addCollegeIfNotExists } = require('../utils/collegeUtils');

exports.getCollegeOptions = async (req, res) => {
    const { email } = req.body;
    const collegeData = await getCollegeOptions(email);
    res.status(200).json(collegeData);
};

exports.addUserDetails = async (req, res) => {
    const { email, address, age, branch, college, phone, gender, country } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!college) return res.status(400).json({ message: "College name is required" });

        // Ensure college is in the database
        const collegeName = await addCollegeIfNotExists(college);

        // Update all user details
        user.email = email;
        user.address = address;
        user.age = age;
        user.branch = branch;
        user.college = collegeName;
        user.phone = phone;
        user.gender = gender;
        user.country = country;
        await user.save();

        res.status(200).json({ message: "User details added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding user details", error });
    }
};
