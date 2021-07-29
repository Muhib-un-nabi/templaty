const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Team must belong to a admin']
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  package: {
    type: Object,
    default: {
      team: false,
      users: 1,
      snippets: 10,
      contacts: 10,
      templates: 10,
      actions: 100
    },
    required: [true, 'Team must have Pakage']
  },
  current: {
    type: Object,
    default: {
      users: 1,
      snippets: 0,
      contacts: 0,
      templates: 0,
      actions: 0
    },
    required: [true, 'Team must have Current Use']
  }
});

const TeamSetting = mongoose.model('Team', teamSchema);

module.exports = TeamSetting;
