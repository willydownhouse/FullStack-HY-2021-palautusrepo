const Blog = require('../models/blogModel');
const User = require('../models/userModel');

exports.getAllBlogs = async (req, res, next) => {
  const data = await Blog.find().populate('user', { id: 1, username: 1 });

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
  const newBlog = await Blog.create({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    user: req.user._id,
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      blogs: [...req.user.blogs, newBlog._id],
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: 'success',
    newBlog,
    user,
  });
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  if (req.user._id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        blogs: req.user.blogs.filter(id => id !== req.params.id),
      },
      {
        new: true,
      }
    );
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'You are not allowed to execute this  action',
    });
  }

  res.status(204).end();
};

exports.updateBlog = async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('user', { id: 1, username: 1 });

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
