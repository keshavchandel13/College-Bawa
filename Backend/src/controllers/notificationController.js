const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// clear this block if not used in frontend (till keep it)
const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const notification = new Notification({ userId, message });
    await notification.save();

    // Emit real-time event
    req.io.to(userId.toString()).emit("newNotification", notification);

    res.status(201).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// markAs read
const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user.id, isRead: false }, { isRead: true });
    res.json({ message: "All notification marked as read" });
  }
  catch (error) {
    res.status(500).json({ message: "Error updating notification" });
  }
};

module.exports = { getNotifications, markAsRead, createNotification }
