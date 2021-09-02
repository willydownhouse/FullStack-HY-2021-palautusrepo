const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [5, "Username must at least 5 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must at least 8 characters"],
    select: false,
  },
  age: {
    type: Number,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
