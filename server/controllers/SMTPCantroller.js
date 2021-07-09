const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const SMTP = require('../models/SMTPModule');
const factory = require('./handlerFactory');
const ReverseMd5 = require('reverse-md5');

exports.getAllSMTP = catchAsync(async (req, res, next) => {
  let query;

  const doc = await SMTP.find({
    $or: [
      {
        team: req.user.team,
        type: 'team'
      },
      {
        user: req.user._id,
        type: 'user'
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

// exports.getSMTP = factory.getOne(SMTP);
exports.getSMTP = catchAsync(async (req, res, next) => {
  let doc = await SMTP.findById(req.params.id).select('+password');

  const sha1 = await crypto.createDecipher(
    'aes128',
    process.env.ENCRYPET_KEY_FOR_SMTP_PASSWORD
  );
  let payload = await sha1.update(doc.password, 'hex', 'utf8');
  payload += await sha1.final('utf8');
  doc.password = payload;

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.updateSMTP = catchAsync(async (req, res, next) => {
  const cipher = await crypto.createCipher(
    'aes128',
    process.env.ENCRYPET_KEY_FOR_SMTP_PASSWORD
  );
  let hash = await cipher.update(req.body.password, 'utf8', 'hex');
  hash += await cipher.final('hex');
  req.body.password = hash;

  const doc = await SMTP.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

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

exports.deleteSMTP = factory.deleteOne(SMTP);

exports.createorUpdateSMTP = catchAsync(async (req, res, next) => {
  const findSMTPTeam = await SMTP.findOne({
    team: req.user.team,
    type: req.body.type
  });

  const findSMTPUser = await SMTP.findOne({
    user: req.user._id,
    type: req.body.type,
    team: req.user.team
  });

  let doc;
  if (findSMTPTeam) {
    doc = await updateSMTP(req, findSMTPTeam._id);
  } else {
    doc = await createSMTP(req);
  }

  if (findSMTPUser) {
    doc = await updateSMTP(req, findSMTPUser._id);
    console.log(doc);
  } else {
    doc = await createSMTP(req);
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

const createSMTP = async req => {
  req.body.password = await encrypetPass(req.body.password);
  return await SMTP.create({
    ...req.body,
    user: req.user._id,
    team: req.user.team
  });
};

const updateSMTP = async (req, id) => {
  req.body.password = await encrypetPass(req.body.password);
  return await SMTP.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
};

const encrypetPass = async pass => {
  console.log(pass);
  const cipher = await crypto.createCipher(
    'aes128',
    process.env.ENCRYPET_KEY_FOR_SMTP_PASSWORD
  );
  let hash = await cipher.update(pass, 'utf8', 'hex');
  hash += await cipher.final('hex');
  return await hash;
};
