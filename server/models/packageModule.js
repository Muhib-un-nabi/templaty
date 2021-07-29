const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pakage Name Is Required']
  },
  duration: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 0.0
  },
  users: {
    type: Number,
    default: 1
  },
  snippets: {
    type: Number,
    default: 10
  },
  templates: {
    type: Number,
    default: 10
  },

  actions: {
    type: Number,
    default: 100
  }
});

const PackageSetting = mongoose.model('Package', packageSchema);

module.exports = PackageSetting;
