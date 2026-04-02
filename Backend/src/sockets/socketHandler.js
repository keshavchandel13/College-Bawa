
let ioInstance;
const onlineUsers = new Map()
function initSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log(` User Connected: ${socket.id}`);

    try {
      // User joins their personal room
      socket.on("join", ({ userId }) => {
        if (!userId) return;

        socket.join(userId);
        onlineUsers.set(userId, socket.id);

        // Send current online list to the joining user
        socket.emit("online-users", Array.from(onlineUsers.keys()));

        // Notify all other users this user is now online
        socket.broadcast.emit("user-online", { userId });
      });


      // User joins a chat room
      socket.on("join-chat", (chatId) => {
        if (!chatId) return;
        socket.join(chatId);
      });

      // Send message in a chat room
      // socket.on("send-message", ({ chatId, message, senderId }) => {
      //   try {
      //     if (!chatId || !message || !senderId) return;
      //     const fullMessage = { ...message, senderId, timestamp: new Date() };
      //     io.to(chatId).emit("receive-message", fullMessage);
      //   } catch (error) {
      //     console.error(" Error in send-message:", error.message);
      //   }
      // });

      // Typing indicator in a chat room
      socket.on("typing", ({ chatId }) => {
        try {
          if (!chatId) return;
          io.to(chatId).emit("typing", {});
        } catch (error) {
          console.error(" Error in typing event:", error.message);
        }
      });

      // Read receipt in a chat room
      socket.on("read-message", ({ messageId, chatId }) => {
        try {
          if (!messageId || !chatId) return;
          io.to(chatId).emit("message-read", { messageId });
        } catch (error) {
          console.error(" Error in read-message:", error.message);
        }
      });

      socket.on("disconnect", () => {
        let disconnectedUserId = null;

        for (const [userId, sId] of onlineUsers.entries()) {
          if (sId === socket.id) {
            disconnectedUserId = userId;
            onlineUsers.delete(userId);
            break;
          }
        }

        if (disconnectedUserId) {
          io.emit("user-offline", { userId: disconnectedUserId });
        }

        console.log(`User Disconnected: ${socket.id}`);
      });


    } catch (error) {
      console.error(" Unexpected error in socket connection:", error.message);
    }
  });
}

// Get the Socket.io instance
function getIo() {
  if (!ioInstance) {
    throw new Error("Socket.io has not been initialized!");
  }
  return ioInstance;
}

module.exports = { initSocket, getIo };
