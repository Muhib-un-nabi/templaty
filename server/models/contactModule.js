const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is Required']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Contact must belong to a User']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Contact must belong to a Team']
  },
  data: {
    type: Object
  },
  visibility: {
    type: Boolean,
    required: [true, 'visibility Option Is Required']
  }
});

const Contacts = mongoose.model('Contacts', contactSchema);

module.exports = Contacts;
