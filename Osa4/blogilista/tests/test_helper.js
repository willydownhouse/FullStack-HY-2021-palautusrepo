const mongoose = require('mongoose');

//

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'james',
    url: 'dadas',
  },
  {
    title: 'blog 2',
    author: 'hamr',
    url: 'dadas',
  },
];
const initialUsers = [
  {
    username: 'kari',
    password: 'test1234',
  },
  {
    username: 'pena',
    password: 'test1234',
  },
];

module.exports = {
  initialBlogs,
  initialUsers,
};
