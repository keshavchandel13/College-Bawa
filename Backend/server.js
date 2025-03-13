require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const notificationRoutes = require("./src/routes/notificationRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your frontend URL
    methods: ["GET", "POST"],
  },
});

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/notifications", notificationRoutes);

// Handle WebSockets
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("sendNotification", (notification) => {
    io.emit("receiveNotification", notification);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
