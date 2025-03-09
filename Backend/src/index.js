const express = require("express");
const session = require('express-session'); 
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const connectDB = require("./config/db")
const passport = require('./config/passport');
const collegeRoutes = require("./routes/collegeRoutes");
const userRoutes = require("./routes/userRoutes")

require('dotenv').config();
// Initialize express app
const app = express();

// Initializing cors
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
  };
// Enable CORS
app.use(cors(corsOptions));

// Add this to handle preflight requests
app.options('*', cors(corsOptions)); // Handles preflight for all routes
app.use(express.json());


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

//Colleges API
app.use("/api/college", collegeRoutes);
app.use("/api/user", userRoutes)

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on the port http://localhost:${PORT}`))







