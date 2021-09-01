const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Username must be at least 5 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});
userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkCorrectPassword = async (
  maybePassword,
  userPassword
) => {
  return await bcrypt.compare(maybePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
