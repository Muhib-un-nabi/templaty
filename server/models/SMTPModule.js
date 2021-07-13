const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const md5 = require('md5');

const SMTPSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Placeholder must belong to a Team']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['user', 'team'],
    default: 'user'
  },
  host: {
    type: String,
    required: [true, 'Host Is Required']
  },
  port: {
    type: Number,
    default: 587
  },
  mail: {
    type: String,
    required: [true, 'mail Is Required']
  },
  password: {
    type: String,
    required: [true, 'password Is Required'],
    select: false
  }
});

// SMTPSchema.pre('save', async function(next) {
//   console.log('Running', this);
//   // Only run this function if password was actually modified
//   if (!this.isModified('password')) return next();

//   // Hash the password with cost of 12
//   this.password;
//   const cipher = await crypto.createCipher(
//     'aes128',
//     process.env.ENCRYPET_KEY_FOR_SMTP_PASSWORD
//   );
//   let hash = await cipher.update(this.password, 'utf8', 'hex');
//   hash += await cipher.final('hex');
//   this.password = hash;
//   next();
// });

SMTPSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const SMTPSetting = mongoose.model('SMTP', SMTPSchema);

module.exports = SMTPSetting;
