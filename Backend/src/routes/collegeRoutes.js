const express = require("express");
const router = express.Router();
const { getCollegeOptions } = require("../utils/collegeUtils");

router.post("/get-college-options", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const collegeData = await getCollegeOptions(email);
    res.json(collegeData);

    
});

module.exports = router;
