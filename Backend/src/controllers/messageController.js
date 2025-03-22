const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const sendMessage = async (req, res) => {

    try {
        const { content, chatId, attachment, id } = req.body;
        // Validate required fields
        if (!content && !attachment?.url) {
            return res.status(400).json({ error: "Message content or attachment required" });
        }
        // Create new message
        const newMessage = new Message({
            sender: id,
            content,
            chat: chatId,
            attachment
        });

        // Save message to the database
        const savedMessage = await newMessage.save();

        // Fetch the full message with sender and chat details
        const fullMessage = await Message.findById(savedMessage._id)
            .populate("sender", "-password")
            .populate("chat");

        // Update the latest message in the chat
        await Chat.findByIdAndUpdate(chatId, { latestMessage: fullMessage });

        // Respond with the newly created message
        res.status(201).json(fullMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error);
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
