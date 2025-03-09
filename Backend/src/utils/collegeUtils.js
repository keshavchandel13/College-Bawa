const axios = require("axios");
const College = require("../models/College");

async function getCollegeOptions(email) {
    try {
        if (!email || !email.includes("@")) {
            return { success: false, message: "Invalid email format" };
        }

        const domain = email.split("@")[1];

        // Fetch college based on email domain from API
        const response = await axios.get(`http://universities.hipolabs.com/search?domain=${domain}`);

        let collegeName = "";
        if (response.data.length > 0) {
            collegeName = response.data[0].name;
        }

        // Fetch stored colleges from the database
        const storedColleges = await College.find().distinct("name");

        return { 
            success: true,
            college: collegeName,  // Prefilled if found
            disableDropdown: !!collegeName,  // Disable if API found a match
            collegesList: collegeName ? [] : storedColleges  // Show stored colleges if no match found
        };

    } catch (error) {
        console.error("Error fetching college data:", error.message);
        const storedColleges = await College.find().distinct("name");
        return { 
            success: false,
            message: "Error fetching college data, using stored colleges",
            college: "", 
            disableDropdown: false, 
            collegesList: storedColleges 
        };
    }
}

async function addCollegeIfNotExists(collegeName) {
    if (!collegeName) return null;
    
    let collegeEntry = await College.findOne({ name: collegeName });
    if (!collegeEntry) {
        collegeEntry = new College({ name: collegeName });
        await collegeEntry.save();
    }
    return collegeEntry.name;
}

module.exports = { getCollegeOptions, addCollegeIfNotExists };
