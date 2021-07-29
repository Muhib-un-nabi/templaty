const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Coupon = require('../models/couponModule');

const factory = require('./handlerFactory');

exports.getCoupons = factory.getAll(Coupon, 'placeholders');

exports.getCoupon = factory.getOne(Coupon, 'placeholders');

exports.updateCoupon = factory.updateOne(Coupon);

exports.deleteCoupon = factory.deleteOne(Coupon);

exports.createCoupon = catchAsync(async (req, res, next) => {
  const newCoupon = await Coupon.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newCoupon
    }
  });
});
