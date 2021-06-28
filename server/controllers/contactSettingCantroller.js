const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ContactSetting = require('./../models/contactSettingModule');
const factory = require('./handlerFactory');

exports.addQueryParams = (req, res, next) => {
  req.params.id = req.user.contactSetting;
  next();
};

exports.getSetting = catchAsync(async (req, res, next) => {
  let doc = await ContactSetting.findOne({ team: req.user.team });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

// factory.getOne(ContactSetting);

exports.savaSetting = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new AppError(`You Don't have any permission to do that action`, 403)
    );
  }
  let doc = await ContactSetting.findOneAndUpdate(
    { team: req.user.team },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.deleteSetting = catchAsync(async (req, res, next) => {
  await ContactSetting.findOneAndDelete({ team: req.user.team });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
