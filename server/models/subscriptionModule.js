const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team'
  },
  coupon: {
    type: mongoose.Schema.ObjectId,
    ref: 'Coupon'
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package'
  },
  paymentMethod: {
    type: String,
    default: 'coupon'
  },
  price: {
    type: Number,
    default: 0
  },
  lastTransectionAt: {
    type: Date(),
    default: Date.now()
  },
  transactions: [
    {
      type: Object,
      default: {
        price: 0,
        date: Date.now()
      }
    }
  ]
});

const SubscriptionSetting = mongoose.model('Subscription', subscriptionSchema);

module.exports = SubscriptionSetting;
