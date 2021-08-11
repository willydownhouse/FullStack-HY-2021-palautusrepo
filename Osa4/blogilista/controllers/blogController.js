const Blog = require('../models/blogModel');

exports.getAllBlogs = async (req, res, next) => {
  const data = await Blog.find();

  res.status(200).json({
    status: 'success',
    docs: data.length,
    data,
  });
};

exports.createBlog = async (req, res, next) => {
  const newBlog = await Blog.create(req.body);

  res.status(201).json({
    status: 'success',
    newBlog,
  });
};
