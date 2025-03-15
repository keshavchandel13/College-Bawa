const express = require('express');
const {accessOrCreateChat, getUserChats} = require("../controllers/chatController")
const verifyToken = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/",verifyToken, accessOrCreateChat) // Create or get existing chat
router.get("/",verifyToken, getUserChats) // get all chats from logged in user

module.exports = router