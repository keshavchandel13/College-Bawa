const express = require("express");
const session = require('express-session'); 
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
const connectDB = require("./config/db")
const passport = require('./config/passport');
require('dotenv').config();
// Initialize express app
const app = express();


// Importing Routes
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
connectDB();

//Routes
app.use("/api/auth",authRoutes) 
// app.use("/api/user",authRoutes) 

// Home Route 
app.get("/", (req,res)=>{
    res.send("college bawa");
});

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on the port http://localhost:${PORT}`))


