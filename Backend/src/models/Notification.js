const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  recipient: { // The user who will receive this notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: { // The user who triggered the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: { // Type of notification
    type: String,
    enum: ['message', 'mention', 'group-invite', 'friend-request', 'admin-alert', 'event-update'],
    required: true,
  },
  message: { // Notification message text
    type: String,
  },
  isRead: { // Whether the user has read it or not
    type: Boolean,
    default: false,
  },
  link: { //redirect link when user clicks on the notification (Implement this later (Phase: 2))
    type: String,
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
