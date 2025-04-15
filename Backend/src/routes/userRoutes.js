const express = require('express');
const { getCollegeOptions, addUserDetails } = require('../controllers/userDetailsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsers, getUserById, updateUserProfile } = require('../controllers/userController');

//Cloudinary file upload 
const upload = require("upload");
const router = express.Router();

router.post('/get-college-options', getCollegeOptions);
// router.post('/add-user-details', addUserDetails, upload.single("profileImage"));

// Protected Routes using authMiddleware
router.get('/all-users', authMiddleware, getAllUsers);
router.get('/user/:id', authMiddleware, getUserById);
router.put('/update', authMiddleware, updateUserProfile);

module.exports = router;
