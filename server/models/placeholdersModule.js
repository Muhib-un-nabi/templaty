const mongoose = require('mongoose');

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
  key: {
    type: String,
    required: [true, 'Key Is Required']
  },
  defaultValue: {
    type: String
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Placeholder must belong to a Team']
  },
  category: {
    type: Array
  },
  visibility: {
    type: Boolean,
    required: [true, 'visibility Option Is Required']
  }
});

const Placeholders = mongoose.model('Placeholders', placeholdersSchema);

module.exports = Placeholders;
