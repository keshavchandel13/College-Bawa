const express = require('express');
const { getCollegeOptions, addUserDetails } = require('../controllers/userDetailsController');
const verifyToken = require('../middlewares/authMiddleware');
const { getAllUsers, getUserById, updateUserProfile} = require('../controllers/userController');

const router = express.Router();

router.post('/get-college-options', getCollegeOptions);
router.post('/add-user-details', addUserDetails);

// Protected Routes using authMiddleware
router.get('/all-users', verifyToken, getAllUsers);
router.get('/user/:id', verifyToken, getUserById);
router.get('/update', verifyToken, updateUserProfile);


module.exports = router;
