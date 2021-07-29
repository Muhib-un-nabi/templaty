const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Placeholders = require('../models/placeholdersModule');
const factory = require('./handlerFactory');

const updataPakage = require('../webSocket/updataPakage');

exports.getPlaceholders = factory.getAllFromTeam(Placeholders);

exports.getPlaceholder = factory.getOne(Placeholders);

exports.updatePlaceholder = factory.updateOne(Placeholders);

exports.deletePlaceholder = factory.deleteOne(Placeholders);

exports.createPlaceholder = catchAsync(async (req, res, next) => {
  const newPlaceholder = await Placeholders.create({
    ...req.body,
    user: req.user._id,
    team: req.user.team
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newPlaceholder
    }
  });

  await updataPakage(Placeholders, req);
});
