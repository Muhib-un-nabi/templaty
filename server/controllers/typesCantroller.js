/* eslint-disable eqeqeq */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const Types = require('../models/typesModule');

exports.getTypes = factory.getAllFromTeam(Types);
exports.getType = factory.getOne(Types);
exports.deleteType = factory.deleteOne(Types);
exports.updateType = factory.updateOne(Types);

exports.createType = catchAsync(async (req, res, next) => {
  //  Create New newType
  const newType = await Types.create({
    name: req.body.name,
    team: req.user.team
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: newType
    }
  });
});
