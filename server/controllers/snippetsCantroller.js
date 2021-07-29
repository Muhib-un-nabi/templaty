const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Snippets = require('../models/snippetsModule');
const factory = require('./handlerFactory');

const updataPakage = require('../webSocket/updataPakage');

exports.getSnippets = factory.getAllFromTeam(Snippets, 'placeholders');

exports.getSnippet = factory.getOne(Snippets, 'placeholders');

exports.updateSnippet = factory.updateOne(Snippets);

exports.deleteSnippet = factory.deleteOne(Snippets);

exports.createSnippet = catchAsync(async (req, res, next) => {
  const newSnippet = await Snippets.create({
    ...req.body,
    user: req.user._id,
    team: req.user.team
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newSnippet
    }
  });

  await updataPakage(Snippets, req);
});
