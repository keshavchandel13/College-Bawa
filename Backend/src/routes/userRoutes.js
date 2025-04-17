const express = require('express');
const { addUserDetails } = require('../controllers/userDetailsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsers, getUserById, updateUserProfile } = require('../controllers/userController');
const upload = require("../middlewares/multer")

//Cloudinary file upload 
// const upload = require("upload");
const router = express.Router();

router.post('/add-user-details', upload.single("profileImage", addUserDetails));

// Protected Routes using authMiddleware
router.get('/all-users', authMiddleware, getAllUsers);
router.get('/user/:id', authMiddleware, getUserById);
router.put('/update', authMiddleware, updateUserProfile);

module.exports = router;
