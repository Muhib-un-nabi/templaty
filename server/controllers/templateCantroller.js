const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Templates = require('../models/templateModule');
const factory = require('./handlerFactory');

const { updataPakage } = require('../webSocket/updataPakage');

exports.getTemplates = factory.getAllFromTeam(Templates);

exports.getTemplate = factory.getOne(Templates);

exports.updateTemplate = factory.updateOne(Templates);

exports.deleteTemplate = factory.deleteOne(Templates);

exports.createTemplate = catchAsync(async (req, res, next) => {
  const newTemplate = await Templates.create({
    ...req.body,
    user: req.user._id,
    team: req.user.team
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newTemplate
    }
  });

  await updataPakage(Templates, req);
});
