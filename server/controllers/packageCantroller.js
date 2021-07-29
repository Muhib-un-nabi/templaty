const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Package = require('../models/packageModule');

const factory = require('./handlerFactory');

exports.getPackages = factory.getAll(Package, 'placeholders');

exports.getPackage = factory.getOne(Package, 'placeholders');

exports.updatePackage = factory.updateOne(Package);

exports.deletePackage = factory.deleteOne(Package);

exports.createPackage = catchAsync(async (req, res, next) => {
  const newPackage = await Package.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newPackage
    }
  });
});
