import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllBlogs } from '../actions';
import BlogItem from './BlogItem';

const BlogList = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('let s get blogs');
    dispatch(getAllBlogs());
  }, []);

  const blogs = useSelector(state => state.blogs);

  console.log('bloglist rendered', blogs);

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
