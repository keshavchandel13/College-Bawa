//  Signup Api
const User = require('../models/User'); // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user= await User.findOne({email});

        // Check if user already exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

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


// login APi: Om work
exports.login= async(req, res) =>{
    try{
        const{email, password} = req.body;
            
        //Check User's Existence
        const user = await User.findOne(email) 
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        //Validate Password
        const match = await bcrypt.compare(User.password, password);
        if(!match){
            return res.status(400).json({
                message: "Invalid Username or Password"
            })
        }

        //Generate Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //Send Response with Token
        res.status(200).json({
            message: "Successful Login",
            token
        })
    
    }catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

// reset-pass APi: ishmeet work
exports.resetPassword= async() =>{
    const { oldPassword, newPassword } = req.body;

    // Check if the old password is provided
    if (!oldPassword || !newPassword) {
        return res.status(400).send('Old and new password are required');
    }

    // Find the user from the database
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Compare old password with the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).send('Old password is incorrect');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).send('Password updated successfully');



};
