const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const contactSettingSchema = new mongoose.Schema({
  setting: {
    type: Object,
    required: [true, 'Please Provide Settings']
  }
});

const ContactSetting = mongoose.model('ContactSetting', contactSettingSchema);

module.exports = ContactSetting;
