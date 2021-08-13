const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter username and password',
    });
  }

  //find user with username
  const user = await User.findOne({ username }).select('+password');

  //check if there is a user ,check if password is correct
  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Wrong username or password.',
    });
  }

  //create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    user: user.username,
    token,
  });
};

exports.checkIfLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.substring(7);
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in. Please login to get access',
    });
  }

  //verification
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //current user

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(401).json({
      status: 'error',
      message: 'The user to this token does not exist anymore',
    });
  }
  //SET CURRENT USER
  req.user = currentUser;

  next();
};
