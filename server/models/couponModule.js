const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Coupon code Is Required']
  },
  code: {
    type: String,
    required: [true, 'Coupon code Is Required']
  },
  valid: {
    type: Boolean,
    default: true
  },
  validTill: {
    type: Date,
    required: [true, 'Coupon Valid Till  Is Required']
  },
  maxLimit: {
    type: String,
    required: [true, 'Coupon Max Limit Is Required']
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package'
  },
  // After Adding
  teams: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Team'
    }
  ],
  expireAt: {
    type: Date
  }
});

const CouponSetting = mongoose.model('Coupon', couponSchema);

module.exports = CouponSetting;
