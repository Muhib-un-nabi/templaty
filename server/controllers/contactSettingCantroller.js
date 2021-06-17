const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ContactSetting = require('./../models/contactSettingModule');
const factory = require('./handlerFactory');

exports.addQueryParams = (req, res, next) => {
  req.params.id = req.user.contactSetting;
  next();
};

exports.getSetting = factory.getOne(ContactSetting);

exports.savaSetting = factory.updateOne(ContactSetting);

exports.deleteSetting = factory.deleteOne(ContactSetting);
