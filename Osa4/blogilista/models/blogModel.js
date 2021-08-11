const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog must have a title'],
  },
  author: {
    type: String,
    required: [true, 'Blog must have an author'],
  },
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
