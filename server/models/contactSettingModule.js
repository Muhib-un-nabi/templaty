const mongoose = require('mongoose');

const contactSettingSchema = new mongoose.Schema({
  setting: {
    type: Object,
    required: [true, 'Please Provide Settings']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Template must belong to a Team']
  }
});

const ContactSetting = mongoose.model('ContactSetting', contactSettingSchema);

module.exports = ContactSetting;
