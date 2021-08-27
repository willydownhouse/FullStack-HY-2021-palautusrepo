const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate('blogs', {
    title: 1,
    author: 1,
  });

  res.status(200).json({
    status: 'success',
    docs: users.length,
    data: users,
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

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
};
