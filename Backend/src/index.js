const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
const connectDB = require("./config/db")
require('dotenv').config();


// Routes
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");

// Initialize express app
const app = express();

// Connect to database
connectDB();

//Routes
// app.use("/api/auth",authRoutes) 
// app.use("/api/user",authRoutes) 

// Home Route 
app.get("/", (req,res)=>{
    res.send("college bawa");
});

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on the port http://localhost${PORT}`))


