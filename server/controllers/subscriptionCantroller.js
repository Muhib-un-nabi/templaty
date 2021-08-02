const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Subscription = require('../models/subscriptionModule');

const factory = require('./handlerFactory');

exports.getSubscriptions = factory.getAll(Subscription, 'placeholders');

exports.getSubscription = factory.getOne(Subscription, 'placeholders');

exports.updateSubscription = factory.updateOne(Subscription);

exports.deleteSubscription = factory.deleteOne(Subscription);

exports.createSubscription = catchAsync(async (req, res, next) => {
  const newSubscription = await Subscription.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newSubscription
    }
  });
});
