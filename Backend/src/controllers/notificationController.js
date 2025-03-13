const Notification = require("../models/Notification");

exports.createNotification = async (req, res) => {
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

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Notification readed
