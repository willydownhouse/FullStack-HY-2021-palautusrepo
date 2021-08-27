import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteBlog, setNotification } from '../actions';

const BlogItem = ({ index, blog, user }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id, user.token));
        dispatch(setNotification(`${blog.title} succesfully deleted!`));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div id={`blog${index}`} key={blog.id} className="item">
      <div className="right floated content">
        {blog.user &&
        (blog.user._id === user.userId || blog.user === user.userId) ? (
          <button
            id={`btnDelete${index}`}
            onClick={() => handleDelete()}
            className="ui button red"
          >
            Delete
          </button>
        ) : null}
      </div>
      <div className="content">
        <div className="header">
          <Link className="ui header" to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
          <p id="author" style={{ marginBottom: '4px' }}>
            Author: {blog.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
