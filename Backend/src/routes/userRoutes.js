const express = require('express');
const { getCollegeOptions, addUserDetails } = require('../controllers/userDetailsController');

const router = express.Router();

router.post('/get-college-options', getCollegeOptions);
router.post('/add-user-details', addUserDetails);

module.exports = router;
