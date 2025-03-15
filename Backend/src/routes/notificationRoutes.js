const express = require("express");
const { getNotifications, markAsRead } = require("../controllers/notificationController");
const verifyToken = require('../middlewares/authMiddleware')
const router = express.Router();

router.post("/", verifyToken, getNotifications);
router.get("/mark-read", verifyToken, markAsRead);

module.exports = router;
