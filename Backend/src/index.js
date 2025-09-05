const express = require("express");
const session = require("express-session");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// App and DB setup
const connectDB = require("./config/db");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { initSocket } = require("./sockets/socketHandler");

// Initialize express app
const app = express();

// CORS setup
const corsOptions = { 
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session & Passport
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
connectDB();

// HTTP server & Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
  }
});
initSocket(io);  //  initSocket function

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/notification", require("./routes/notificationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/marketplace", require("./routes/marketPlaceRoute"));
app.use("/api/search", require("./routes/searchRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("college bawa");
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
