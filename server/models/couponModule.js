const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code Is Required']
  },
  expired: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const CouponSetting = mongoose.model('Coupon', couponSchema);

module.exports = CouponSetting;
