let ioInstance;

function initSocket(io) {
  ioInstance = io; // Store instance globally

  io.on("connection", (socket) => {
    console.log(`[✅] User Connected: ${socket.id}`);

    try {
      // Joining User's Room
      socket.on("join", ({ userId }) => {
        if (!userId) return console.warn("[⚠️] Missing userId in join event");
        socket.join(userId);
        console.log(`[🏠] User ${userId} joined their personal room`);
      });

      // Joining a Chat Room
      socket.on("join-chat", (chatId) => {
        if (!chatId) return console.warn("[⚠️] Missing chatId in join-chat event");
        socket.join(chatId);
        console.log(`[📢] User joined chat room: ${chatId}`);
      });

      // Sending messages
      socket.on("send-message", ({ chatId, message, senderId }) => {
        try {
          if (!chatId || !message || !senderId) {
            console.log("In socket Handler backend: ")
            console.log("chatId",chatId)
            console.log("message",message)
            console.log("senderId",senderId)
            return console.warn("[⚠️] Missing fields in send-message event");

          }
          const fullMessage = { ...message, senderId, timestamp: new Date() };
          io.to(chatId).emit("receive-message", fullMessage);
          console.log(`[📩] Message sent to chat: ${chatId}`);
        } catch (error) {
          console.error("[❌] Error in send-message:", error.message);
        }
      });

      // Typing Indicator
      socket.on("typing", ({ chatId }) => {
        try {
          if (!chatId) return console.warn("[⚠️] Missing chatId in typing event");
          io.to(chatId).emit("typing", {});
        } catch (error) {
          console.error("[❌] Error in typing event:", error.message);
        }
      });

      // Message Read Receipt
      socket.on("read-message", ({ messageId, chatId }) => {
        try {
          if (!messageId || !chatId) {
            console.log(messageId)
            console.log(chatId)
            return console.warn("[⚠️] Missing fields in read-message event");
          }
          io.to(chatId).emit("message-read", { messageId });
        } catch (error) {
          console.error("[❌] Error in read-message:", error.message);
        }
      });

      // Handle Disconnection
      socket.on("disconnect", () => {
        console.log(`[❎] User Disconnected: ${socket.id}`);
      });

    } catch (error) {
      console.error("[❌] Unexpected error in socket connection:", error.message);
    }
  });
}

function getIo() {
  if (!ioInstance) {
    throw new Error("Socket.io has not been initialized!");
  }
  return ioInstance;
}

module.exports = { initSocket, getIo };
