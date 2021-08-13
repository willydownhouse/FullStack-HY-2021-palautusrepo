const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate('blogs', {
    title: 1,
    author: 1,
  });

  res.status(200).json({
    status: 'success',
    docs: users.length,
    users,
  });
};

exports.createUser = async (req, res) => {
  const newUser = {
    name: req.body.nimi,
    username: req.body.username,
    password: req.body.password,
  };

  const user = await User.create(newUser);

  res.status(201).json({
    status: 'success',
    user,
  });
};
