import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAll } from '../actions';
import BlogItem from './BlogItem';

const BlogList = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll('blogs'));
  }, []);

  const blogs = useSelector(state => state.blogs);

  const renderBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <BlogItem
          index={i}
          key={blog.id}
          user={user}
          blog={blog}
          blogs={blogs}
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
