const Chat = require("../models/chatModel");
const Message = require("../models/messageModel")
const sendMessage = async (req, res) => {
    const { content, chatId, attachment } = req.body;

    if (!content && !attachment?.url) {
        res.status(400).json({ error: "Message content or attachment required" });
    }

    const newMessage = new Message({
        sender: req.user.uid,
        content,
        chat: chatId,
        attachment
    });

    const savedMessage = await newMessage.save();
    const fullMessage = await Message.findById(savedMessage._id)
        .populate("sender", "-password")
        .populate("chat");

    // Update Last Message in chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: fullMessage });
    res.status(201).json(fullMessage);
};

const getMessagesForChat = async (req, res) => {
    const chatId = req.params.chatId;

    const messages = await Message.find({ chat: chatId })
        .populate("sender", "-password")
        .populate("chat")
        .sort({ createdAt: 1 });
    res.json(messages);
};

module.exports = { sendMessage, getMessagesForChat };