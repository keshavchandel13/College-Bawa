const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { sendMessage, getMessagesForChat } = require('../controllers/messageController');

const router = express.Router();

router.post('/', authMiddleware, sendMessage); // send new messages
router.get('/:chatId',authMiddleware, getMessagesForChat); // get all messages for chat

module.exports = router;