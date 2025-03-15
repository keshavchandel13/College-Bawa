const express = require('express')
const verifyToken = require('../middlewares/authMiddleware');
const { sendMessage, getMessagesForChat } = require('../controllers/messageController');

const router = express.Router();

router.post('/', verifyToken, sendMessage); // send new messages
router.get('/:chatId',verifyToken, getMessagesForChat); // get all messages for chat

module.exports = router;