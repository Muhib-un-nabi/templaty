const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const htmlToText = require('html-to-text');

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

  doc.password = await deEncrypetPass(doc.password);

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.updateSMTP = catchAsync(async (req, res, next) => {
  req.body.password = await encrypetPass(req.body.password);

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

  if (findSMTPTeam) {
    const doc = await updateSMTP(req, findSMTPTeam._id);
    return sendResponce(res, doc);
  } else if (!findSMTPTeam && req.body.type === 'team') {
    const doc = await createSMTP(req);
    return sendResponce(res, doc);
  } else if (findSMTPUser) {
    const doc = await updateSMTP(req, findSMTPUser._id);
    return sendResponce(res, doc);
  } else if (!findSMTPUser && req.body.type === 'user') {
    const doc = await createSMTP(req);
    return sendResponce(res, doc);
  }

  return next(new AppError('This Request not proceeded.', 400));
});

const sendResponce = (res, doc) => {
  return res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
};

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
  const cipher = await crypto.createCipher(
    'aes128',
    process.env.ENCRYPET_KEY_FOR_SMTP_PASSWORD
  );
  let hash = await cipher.update(pass, 'utf8', 'hex');
  hash += await cipher.final('hex');
  return hash;
};

const deEncrypetPass = async pass => {
  const sha1 = await crypto.createDecipher(
    'aes128',
    process.env.ENCRYPET_KEY_FOR_SMTP_PASSWORD
  );
  let payload = await sha1.update(pass, 'hex', 'utf8');
  payload += await sha1.final('utf8');
  return payload;
};

exports.sendMail = catchAsync(async (req, res, next) => {
  let smtpAccount = await SMTP.findById(req.body.from).select('+password');

  // End Responce If Can't Find An SMTP Account
  if (!smtpAccount)
    return next(new AppError('This Request not proceeded.', 400));
  smtpAccount.password = await deEncrypetPass(smtpAccount.password);
  mail({
    user: smtpAccount.mail,
    pass: smtpAccount.password,
    host: smtpAccount.host,
    port: smtpAccount.port,
    secure: smtpAccount.secure,
    from: smtpAccount.mail,

    to: req.body.to,
    cc: req.body.cc,
    bcc: req.body.bcc,

    subject: req.body.subjec,
    body: req.body.body
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: 'doc'
    }
  });
});

async function mail({
  user,
  pass,
  host,
  port,
  secure,
  from,

  to = [],
  cc = [],
  bcc = [],
  subject,
  body
}) {
  let transporter = nodemailer.createTransport(
    smtpTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      }
    })
  );

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from,
    to: to.join(', '),
    cc: cc.join(', '),
    bcc: bcc.join(', '),
    subject,
    html: body,
    text: htmlToText.fromString(body)
  });

  console.log('Email Sended');
  console.log('Message sent: %s', info.messageId);
}
