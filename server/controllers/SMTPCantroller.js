const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const SMTP = require('../models/SMTPModule');
const factory = require('./handlerFactory');

exports.getAllSMTP = catchAsync(async (req, res, next) => {
  let query;
  if (req.user.role === 'user') {
    query = {
      $or: [
        {
          team: req.user.team,
          type: 'team'
        },
        {
          user: req.user._id
        }
      ]
    };
  } else if (req.user.role === 'admin') {
    query = { team: req.user.team };
  }

  const doc = await SMTP.find(query);

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getSMTP = factory.getOne(SMTP);

exports.updateSMTP = factory.updateOne(SMTP);

exports.deleteSMTP = factory.deleteOne(SMTP);

exports.createSMTP = catchAsync(async (req, res, next) => {
  const newSMTP = await SMTP.create({
    ...req.body,
    user: req.user._id,
    team: req.user.team
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newSMTP
    }
  });
});
