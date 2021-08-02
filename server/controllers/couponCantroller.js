const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Coupon = require('../models/couponModule');
const Package = require('../models/packageModule');
const Team = require('../models/teamModule');

const factory = require('./handlerFactory');

///

exports.checkCoupn = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    code: req.body.coupon,
    valid: true,
    validTill: { $gt: Date.now() },
    maxLimit: { $gt: 0 }
  });

  // Send Error Res If No Coupon Is Found
  if (!coupon) {
    return res.status(404).json({
      status: 'fali',
      data: {
        data: {
          coupon,
          valid: false,
          code: req.body.coupon
        }
      }
    });
  }
  // Send Error If Team Already used This Token
  if (coupon.teams.includes(req.user.team)) {
    return res.status(204).json({
      status: 'fali',
      data: {
        data: null,
        error: 'Already Used This Token'
      }
    });
  }

  const package = await Package.findById(coupon.package);

  // Sending Response
  res.status(200).json({
    status: 'success',
    data: {
      data: package
    }
  });

  await Coupon.findByIdAndUpdate(coupon._id, {
    $push: { teams: req.user.team },
    maxLimit: --coupon.maxLimit
  });

  // Update Other Info
  await Team.findByIdAndUpdate(req.user.team, { package });
});

///
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
