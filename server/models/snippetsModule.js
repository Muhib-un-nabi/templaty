const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const snippetsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is Required']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Snippet must belong to a User']
  },
  placeholders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Placeholders'
    }
  ],
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Snippet must belong to a Team']
  },
  category: {
    type: Array
  },
  discription: {
    type: String,
    required: [true, 'Discription Is Required']
  },
  visibility: {
    type: Boolean,
    required: [true, 'visibility Option Is Required']
  }
});

const Snippets = mongoose.model('Snippets', snippetsSchema);

module.exports = Snippets;
