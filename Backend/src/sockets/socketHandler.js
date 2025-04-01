let ioInstance;

/**
 * Initializes the Socket.io instance and sets up event listeners for user connections.
 * @param {Object} io - The Socket.io server instance.
 */
function initSocket(io) {
  ioInstance = io; // Store the Socket.io instance globally for use across the application.

  io.on("connection", (socket) => {
    console.log(` User Connected: ${socket.id}`);

    try {
      /**
       * Handle user joining their personal room.
       * @param {Object} data - Contains the user's unique ID.
       */
      socket.on("join", ({ userId }) => {
        if (!userId) return;
        socket.join(userId);
      });

      /**
       * Handle user joining a specific chat room.
       * @param {string} chatId - The unique ID of the chat room.
       */
      socket.on("join-chat", (chatId) => {
        if (!chatId) return;
        socket.join(chatId);
      });

      /**
       * Handle sending messages within a chat room.
       * @param {Object} data - Contains chatId, message content, and senderId.
       */
      socket.on("send-message", ({ chatId, message, senderId }) => {
        try {
          if (!chatId || !message || !senderId) return;
          const fullMessage = { ...message, senderId, timestamp: new Date() };
          io.to(chatId).emit("receive-message", fullMessage);
        } catch (error) {
          console.error(" Error in send-message:", error.message);
        }
      });

      /**
       * Handle typing indicator broadcasting within a chat room.
       * @param {Object} data - Contains the chatId where typing is occurring.
       */
      socket.on("typing", ({ chatId }) => {
        try {
          if (!chatId) return;
          io.to(chatId).emit("typing", {});
        } catch (error) {
          console.error(" Error in typing event:", error.message);
        }
      });

      /**
       * Handle read receipt broadcasting within a chat room.
       * @param {Object} data - Contains the messageId and chatId for acknowledgment.
       */
      socket.on("read-message", ({ messageId, chatId }) => {
        try {
          if (!messageId || !chatId) return;
          io.to(chatId).emit("message-read", { messageId });
        } catch (error) {
          console.error(" Error in read-message:", error.message);
        }
      });

      /**
       * Handle user disconnection from the server.
       */
      socket.on("disconnect", () => {
        console.log(` User Disconnected: ${socket.id}`);
      });

    } catch (error) {
      console.error(" Unexpected error in socket connection:", error.message);
    }
  });
}

/**
 * Retrieves the initialized Socket.io instance.
 * @returns {Object} - The Socket.io instance.
 * @throws Will throw an error if Socket.io is not initialized.
 */
function getIo() {
  if (!ioInstance) {
    throw new Error("Socket.io has not been initialized!");
  }
  return ioInstance;
}

module.exports = { initSocket, getIo };
