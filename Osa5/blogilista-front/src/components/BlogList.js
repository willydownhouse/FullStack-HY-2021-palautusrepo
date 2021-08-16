import React from 'react';
import { useEffect } from 'react';

import blogsApi from '../apis/blogsApi';
import BlogItem from './BlogItem';

const BlogList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogsApi.get('/api/blogs').then(res => {
      console.log(res.data.data);
      setBlogs(res.data.data);
    });
  }, []);

  const renderBlogs = () => {
    return blogs.map(blog => {
      return <BlogItem key={blog.id} blog={blog} />;
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
