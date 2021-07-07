const mongoose = require('mongoose');

const SMTPSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Placeholder must belong to a Team']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['user', 'team'],
    default: 'user'
  },
  host: {
    type: String,
    required: [true, 'Host Is Required']
  },
  port: {
    type: Number,
    default: 587
  },
  secure: {
    type: Boolean,
    default: false
  },
  mail: {
    type: String,
    required: [true, 'mail Is Required']
  },
  password: {
    type: String,
    required: [true, 'password Is Required']
  }
});

const SMTPSetting = mongoose.model('SMTP', SMTPSchema);

module.exports = SMTPSetting;
