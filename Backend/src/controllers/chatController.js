const Chat = require('../models/chatModel');

const accessOrCreateChat = async (res, req) => {
    const { userId } = req.body;
    const currentUserId = req.body.uid;
    if (!userId) return res.status(400).json({ error: 'UserId is required' });

    let chat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [userId, currentUserId] },
    }).populate("users", "-password");

    if (chat) return res.json(chat);

    const newChat = new Chat({
        users: [userId, currentUserId],
    });

    const createdChat = await newChat.save();
    const fullChat = await Chat.findById(createdChat._id).populate("users", "-password");
    res.status(201).json(fullChat);
};

const getUserChats = async (req, res) => {
    const chats = await Chat.find({ users: req.user.uid })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

    res.json(chats);
};

module.exports = { accessOrCreateChat, getUserChats };

