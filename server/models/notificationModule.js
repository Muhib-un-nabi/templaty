const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Notification Name Is Required']
  },
  seen: {
    type: Boolean,
    default: false
  },
  users: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Notification must belong to a Team']
  }
});

const NotificationSetting = mongoose.model('Notification', notificationSchema);

module.exports = NotificationSetting;
