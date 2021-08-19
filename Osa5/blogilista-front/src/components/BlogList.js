import React from 'react';
import { useEffect } from 'react';

import blogsApi from '../apis/blogsApi';
import BlogItem from './BlogItem';
//@babel/preset-react
const BlogList = ({
  blogs,
  setBlogs,
  user,
  setNotification,
  setErrMessage,
}) => {
  useEffect(() => {
    blogsApi.get('/api/blogs').then(res => {
      setBlogs(res.data.data.sort((a, b) => b.likes - a.likes));
      console.log(res.data.data);
    });
  }, []);

  const renderBlogs = () => {
    return blogs.map(blog => {
      return (
        <BlogItem
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
      <div className="ui very relaxed list">{renderBlogs()}</div>
    </div>
  );
};

export default BlogList;
