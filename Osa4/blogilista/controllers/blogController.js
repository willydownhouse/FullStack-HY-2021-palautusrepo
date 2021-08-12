const Blog = require('../models/blogModel');

exports.getAllBlogs = async (req, res, next) => {
  const data = await Blog.find();

  res.status(200).json({
    status: 'success',
    docs: data.length,
    data,
  });
};

exports.getOneBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: blog,
  });
};

exports.createBlog = async (req, res) => {
  const newBlog = await Blog.create(req.body);

  res.status(201).json({
    status: 'success',
    newBlog,
  });
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  res.status(204).end();
};

exports.updateBlog = async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: updatedBlog,
  });
};
