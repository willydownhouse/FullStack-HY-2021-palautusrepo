const User = require('../models/userModel');
const Blog = require('../models/blogModel');

exports.resetDataBase = async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
};

exports.initDataBase = async (req, res) => {
  const user1 = await User.create({
    username: 'keke',
    password: 'test1234',
    blogs: [],
  });
  const user2 = await User.create({
    username: 'niina',
    password: 'test1234',
    blogs: [],
  });

  const blogs = await Blog.insertMany([
    {
      title: 'Blog 1',
      author: 'winnyT',
      url: 'www.haloo.fi',
      user: user1._id,
    },
    {
      title: 'Blog 2',
      author: 'liisa',
      url: 'www.blogi.com',
      user: user2._id,
      likes: 2,
    },
  ]);

  res.status(201).json({
    status: 'success',
    user1,
    user2,
    blogs,
  });
};
