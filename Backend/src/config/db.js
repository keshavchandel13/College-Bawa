const mongoose = require('mongoose') // Imported mongoose
const dotenv = require('dotenv')
require('dotenv').config();
// Establishing connection with mongodb atlas
const connectDB = async()=>{
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "CollegeBawa", 
        });

        console.log("MongoDB connected ");
    } catch (error) {
        console.error(" MongoDB connection error:", error.message);
        process.exit(1);
    }
};
module.exports = connectDB