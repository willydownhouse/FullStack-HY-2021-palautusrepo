const _ = require('lodash-contrib');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.map(blog => blog.likes).reduce((acc, val) => acc + val);
};

const favoriteBlog = blogs => {
  const mostLikes = blogs.map(blog => blog.likes).sort((a, b) => b - a)[0];
  return blogs.find(blog => blog.likes === mostLikes);
};

const mostBlogs = blogs => {
  const array = blogs.map(blog => blog.author);

  const result = _(array).countBy().entries().maxBy(_.last);
  return {
    author: result[0],
    blogs: result[1],
  };
};

const mostLikes = blogs => {
  const data = blogs.map(blog => {
    return {
      author: blog.author,
      likes: blog.likes,
    };
  });

  const likesMap = new Object();
  for (let i = 0; i < data.length; i++) {
    if (likesMap[data[i]['author']] == null) {
      likesMap[data[i]['author']] = data[i];
    } else {
      likesMap[data[i]['author']]['likes'] += data[i]['likes'];
    }
  }

  //convert likesMap to list
  const result = [];
  for (const key in likesMap) {
    if (likesMap.hasOwnProperty(key)) {
      result.push(likesMap[key]);
    }
  }
  //sort and pick first
  return result.sort((a, b) => b.likes - a.likes)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
