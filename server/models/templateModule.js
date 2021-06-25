const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const TemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is Required']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Template must belong to a User']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Template must belong to a Team']
  },
  snippets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Snippets'
    }
  ],
  placeholders: [
    {
      type: Object
    }
  ],
  visibility: {
    type: Boolean,
    required: [true, 'visibility Option Is Required']
  }
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;
