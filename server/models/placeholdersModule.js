const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const placeholdersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is Required']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Placeholder must belong to a User']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Placeholder must belong to a Team']
  },
  category: {
    type: Array
  },
  data: {
    type: Object
  },
  visibility: {
    type: Boolean,
    required: [true, 'visibility Option Is Required']
  }
});

const Placeholders = mongoose.model('Placeholders', placeholdersSchema);

module.exports = Placeholders;
