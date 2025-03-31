const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const { getIo } = require("../sockets/socketHandler")
const mongoose = require("mongoose");
const sendMessage = async (req, res) => { 
    try {
        const { content, chatId, attachment, id } = req.body;

        if (!content && !attachment?.url) {
            console.log("❌ Message content or attachment required");
            return res.status(400).json({ error: "Message content or attachment required" });
        }

        // ✅ Check if chatId exists
        const chatExists = await Chat.findById(chatId);
        if (!chatExists) {
            console.error("❌ Chat not found in database:", chatId);
            return res.status(400).json({ error: "Chat not found" });
        }

        // ✅ Create new message linked to a valid chat
        const newMessage = new Message({
            sender: id,
            content,
            chat: chatId,
            attachment
        });

        const savedMessage = await newMessage.save();

        // ✅ Populate sender and chat
        const fullMessage = await Message.findById(savedMessage._id)
            .populate("sender", "-password")
            .populate("chat");

        await Chat.findByIdAndUpdate(chatId, { latestMessage: fullMessage });

        // ✅ Emit event to chat room
        const io = getIo();
        console.log("✅ Message sent successfully:", fullMessage);
        io.to(chatId).emit("receive-message", fullMessage);

        res.status(201).json(fullMessage);
    } catch (error) {
        console.error("❌ Error in sendMessage:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
};

const getMessagesForChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;

        // Validate chatId
        if (!chatId) {
            return res.status(400).json({ error: "Chat ID is required" });
        }
        // Fetch messages for the given chat
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "-password")
            .populate("chat")
            .sort({ createdAt: 1 });

        if (!messages) {
            return res.status(404).json({ error: "Messages not found" });
        }
        // Respond with the fetched messages
        res.json(messages);
    } catch (error) {
        console.error("Error in getMessagesForChat:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

module.exports = { sendMessage, getMessagesForChat };
