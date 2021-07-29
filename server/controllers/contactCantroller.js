const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Contact = require('../models/contactModule');
const factory = require('./handlerFactory');

const updataPakage = require('../webSocket/updataPakage');

// const User = require('./../models/userModel');
// const ContactSetting = require('./../models/contactSettingModule');
// const Team = require('./../models/teamModule');

exports.getContacts = factory.getAllFromTeam(Contact);

exports.getContact = factory.getOne(Contact);

exports.updateContact = factory.updateOne(Contact);

exports.deleteContact = factory.deleteOne(Contact);

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create({
    ...req.body,
    user: req.user._id,
    team: req.user.team
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: newContact
    }
  });

  await updataPakage(Contact, req);
});
