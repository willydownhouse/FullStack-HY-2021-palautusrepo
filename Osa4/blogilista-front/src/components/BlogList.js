import React from 'react';
import { useEffect } from 'react';

import blogsApi from '../apis/blogsApi';
import BlogItem from './BlogItem';

const BlogList = ({
  blogs,
  setBlogs,
  user,
  setNotification,
  setErrMessage,
}) => {
  useEffect(() => {
    blogsApi
      .get('/api/blogs')
      .then(res => {
        setBlogs(res.data.data.sort((a, b) => b.likes - a.likes));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const renderBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <BlogItem
          index={i}
          setErrMessage={setErrMessage}
          setNotification={setNotification}
          key={blog.id}
          user={user}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      );
    });
  };

  return (
    <div>
      <h1 className="ui header">Blogs</h1>
      <div id="blogList" className="ui very relaxed list">
        {renderBlogs()}
      </div>
    </div>
  );
};

export default BlogList;
