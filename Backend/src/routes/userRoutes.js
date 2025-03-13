const express = require("express");
const { addUserDetails, getCollegeOptions } = require("../controllers/userDetailsController");

const router = express.Router();

router.post("/add-user-details", addUserDetails);
router.post("/get-college-options", getCollegeOptions);

module.exports = router;