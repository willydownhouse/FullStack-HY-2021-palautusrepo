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
  url: {
    type: String,
    required: [true, 'Blog must have url'],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

blogSchema.set('toJSON', {
  virtuals: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
