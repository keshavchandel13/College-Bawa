const Chat = require('../models/chatModel');
const User = require('../models/User');
const Message = require('../models/messageModel');
const accessOrCreateChat = async (req, res) => {
    try {
      const { userId,currentUserId } = req.body;
  
      if (!userId || !currentUserId) {
        return res.status(400).json({ error: 'UserId is required' });
      }
  
      // Check if a chat already exists between these two users (in any order)
      let chat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [userId, currentUserId], $size: 2 },
      }).populate("users", "-password");
      if (chat) {
        return res.json(chat);
      }
  
      // Create a new one-on-one chat
      const createdChat = await Chat.create({
        isGroupChat: false,
        users: [userId, currentUserId],
      });
  
      const fullChat = await Chat.findById(createdChat._id)
        .populate("users", "-password");
      res.status(201).json(fullChat);
    } catch (error) {
      console.error("Error in accessOrCreateChat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  const getUserChats = async (req, res) => {
    try {
        const { userId, selectedUserId, page = 1, limit = 10 } = req.query;
        if (!userId || !selectedUserId) {
            return res.status(400).json({ message: "Both userId and selectedUserId are required" });
        }

        const skip = (page - 1) * limit;

        // 🔍 Find the chat document between the two users
        const chat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [userId, selectedUserId] }  // Ensure both users are in the chat
        });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        //  Fetch messages for this chat
        const messages = await Message.find({ chat: chat._id }) 
            .sort({ createdAt: -1 })  // Latest messages first
            .skip(skip)
            .limit(parseInt(limit))
            .populate("sender", "name email") // Populate sender details
            .exec();

        const totalMessages = await Message.countDocuments({ chat: chat._id });

        const totalPages = Math.ceil(totalMessages / limit);

        res.status(200).json({
            chat: {  // ✅ Send chatId along with messages
                _id: chat._id,
                isGroupChat: chat.isGroupChat,
                users: chat.users,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt
            },
            messages: messages.reverse(),
            page: Number(page),
            limit: Number(limit),
            totalMessages,
            totalPages,
        });
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        res.status(500).json({ message: "Error fetching chat messages" });
    }
};
  
  const getUsersAndGroupsChattedWith = async (req, res) => {
    try {
      const {userId} = req.query;
      if (!userId) {
        return res.status(400).json({ error: "User Id not found" });
      }
  
      // Fetching chats where the user is a participant
      const chats = await Chat.find({ users: userId }).select("users isGroupChat");  
      let uniqueUsersIds = new Set();
      let userGroups = [];
  
      // Getting unique users & groups
      chats.forEach(chat => {
        if (chat.isGroupChat) {
          userGroups.push(chat._id);
        } else {
          chat.users.forEach(user => {
            if (user.toString() !== userId.toString()) {
              uniqueUsersIds.add(user.toString());
            }
          });
        }
      });
  
      // Fetch user details for unique users (include profileImage)
      const users = await User.find({ _id: { $in: Array.from(uniqueUsersIds) } })
        .select("name email profileImage");
  
      // Fetch group details
      const groups = await Chat.find({ _id: { $in: userGroups } })
        .populate("groupAdmin", "name email profileImage") 
        .populate("users", "name email profileImage") // fetch group members too
        .select("chatName groupImage isGroupChat users groupAdmin");

      res.json({
        users,
        groups
      });
  
    } catch (error) {
      console.error("Error in getUsersAndGroupsChattedWith fetching users and groups:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = { accessOrCreateChat, getUserChats, getUsersAndGroupsChattedWith };
