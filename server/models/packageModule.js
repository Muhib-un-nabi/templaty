const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pakage Name Is Required']
  },

  // Details
  team: {
    type: String,
    default: false
  },
  duration: {
    type: Number,
    default: 1
  },
  perUser: {
    type: Boolean,
    default: false
  },
  // Limitations
  price: {
    type: String,
    default: 0.0
  },
  users: {
    type: String,
    default: 1
  },
  snippets: {
    type: String,
    default: 10
  },
  templates: {
    type: String,
    default: 10
  },
  contacts: {
    type: String,
    default: 10
  },
  actions: {
    type: String,
    default: 100
  }
});

const PackageSetting = mongoose.model('Package', packageSchema);

module.exports = PackageSetting;
