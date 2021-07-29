const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Notification = require('../models/notificationModule');

const factory = require('./handlerFactory');

exports.getNotifications = factory.getAll(Notification, 'placeholders');

exports.getNotification = factory.getOne(Notification, 'placeholders');

exports.updateNotification = factory.updateOne(Notification);

exports.deleteNotification = factory.deleteOne(Notification);

exports.createNotification = catchAsync(async (req, res, next) => {
  const newNotification = await Notification.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newNotification
    }
  });
});
