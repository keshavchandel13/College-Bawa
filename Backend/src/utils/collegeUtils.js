const axios = require("axios");
const College = require("../models/College");

async function getCollegeOptions(email) {
    try {
        const domain = email.split("@")[1];

        // Fetch college based on domain
        const response = await axios.get(`http://universities.hipolabs.com/search?domain=${domain}`);

        if (response.data.length > 0) {
            return { 
                college: response.data[0].name, 
                disableDropdown: true, 
                collegesList: [] 
            };
        }

        // If no college found, fetch stored colleges from the database
        const storedColleges = await College.find().distinct("name");
        return { 
            college: "", 
            disableDropdown: false, 
            collegesList: storedColleges 
        };

    } catch (error) {
        console.error("Error fetching college data:", error.message);

        // Return stored colleges even if API fails
        const storedColleges = await College.find().distinct("name");
        return { 
            college: "", 
            disableDropdown: false, 
            collegesList: storedColleges 
        };
    }
}

module.exports = { getCollegeOptions };
