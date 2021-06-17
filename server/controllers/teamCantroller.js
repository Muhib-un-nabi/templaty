/* eslint-disable eqeqeq */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const User = require('./../models/userModel');
const ContactSetting = require('./../models/contactSettingModule');
const Team = require('./../models/teamModule');
//  Data Module
const Placeholders = require('./../models/placeholdersModule');
const Snippets = require('./../models/snippetsModule');
const Contact = require('./../models/contactModule');

exports.addQueryParams = (req, res, next) => {
  req.params.id = req.user.team;
  next();
};

exports.getTeamDetail = factory.getOne(Team, ['users', 'admin']);

exports.updateUsers = factory.updateOne(Team);

exports.deleteUsers = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.user.team).populate('users');

  const currUser = await team.users.find(user => user._id == req.params.id);
  if (!currUser) {
    return next(new AppError(`Can't Find User (in Team) with this id`, 400));
  }
  //  Remove User From Team
  await Team.findByIdAndUpdate(
    req.user.team,
    { $pull: { users: req.params.id } },
    {
      new: true,
      runValidators: true
    }
  );
  //  Remove User From Db
  await User.findByIdAndDelete(req.params.id);
  //  Delete Contact Setting
  await ContactSetting.findByIdAndDelete(currUser.contactSetting);

  // Handle User Data
  console.log(req.user._id);

  if (req.query.deleteUserData === 'true') {
    const query = { user: req.params.id };
    await Placeholders.deleteMany(query);
    await Snippets.deleteMany(query);
    await Contact.deleteMany(query);
  } else {
    const asignTo = req.params.asignTo || req.user._id;
    const update = [
      { user: req.params.id },
      { user: asignTo },
      {
        runValidators: true
      }
    ];
    await Placeholders.updateMany(...update);
    await Snippets.updateMany(...update);
    await Contact.updateMany(...update);
  }
  // Send final Responce
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  // Create Contact Setting
  const newSetting = new ContactSetting({
    setting: []
  });
  //  Create New User
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    contactSetting: newSetting._id,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    team: req.user.team,
    role: 'user'
  });

  //  Save All
  await newSetting.save();
  await newUser.save();
  await Team.findByIdAndUpdate(
    req.user.team,
    { $push: { users: newUser._id } },
    {
      new: true,
      runValidators: true
    }
  );
  next();
});
