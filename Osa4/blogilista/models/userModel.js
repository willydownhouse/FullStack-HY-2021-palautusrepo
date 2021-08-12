const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mogoose.Schema({
  nimi: {
    type: String,
  },
  username: {
    type: String,
    required: [true, 'User must have a username'],
    minlength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 3,
    select: false,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mogoose.model('User', userSchema);

module.exports = User;
