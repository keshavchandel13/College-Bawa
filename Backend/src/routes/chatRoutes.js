const express = require('express');
const {accessOrCreateChat, getUserChats, getUsersAndGroupsChattedWith} = require("../controllers/chatController")
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/",authMiddleware, accessOrCreateChat) // Create or get existing chat
router.get("/",authMiddleware, getUserChats) // get all chats from logged in user
router.get("/getuser",authMiddleware,getUsersAndGroupsChattedWith)

module.exports = router