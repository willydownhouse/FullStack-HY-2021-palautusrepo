const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
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
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

userSchema.plugin(uniqueValidator);

//Salataan salasana
userSchema.pre('save', async function (next) {
  //if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

//Tarkastetaan onko oikea salasana
userSchema.methods.checkCorrectPassword = async (
  maybePassword,
  userPassword
) => {
  return await bcrypt.compare(maybePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
