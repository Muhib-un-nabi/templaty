const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const typesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is Required']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Placeholder must belong to a Team']
  },
  visibility: {
    type: Boolean,
    default: true
  }
});

const TypesSetting = mongoose.model('Types', typesSchema);

module.exports = TypesSetting;
