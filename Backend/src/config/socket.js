// Socket jo hai vo hamara real-time update uthaega for notification

const socketIo = require("socket.io");

module.exports = (server) => {
  const io = socketIo(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join room for user notifications
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
