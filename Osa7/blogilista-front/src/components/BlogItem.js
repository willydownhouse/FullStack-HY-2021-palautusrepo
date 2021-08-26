import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteBlog, setNotification } from '../actions';
import blogsApi from '../apis/blogsApi';

const BlogItem = ({ index, blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const dispatch = useDispatch();

  const addLikes = () => {
    blogsApi
      .patch(`/api/blogs/${blog.id}`, { likes: likes + 1 })
      .then(res => {
        setLikes(res.data.data.likes);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

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
        <button
          id={`btnShow${index}`}
          onClick={() => setShowDetails(!showDetails)}
          className="ui button"
        >
          {showDetails ? 'Hide' : 'Show'}
        </button>
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
          <h2 className="ui header">{blog.title}</h2>
          <p id="author" style={{ marginBottom: '4px' }}>
            Author: {blog.author}
          </p>
        </div>

        <div
          className="meta"
          style={showDetails ? { display: '' } : { display: 'none' }}
        >
          <span id={`likes${index}`} value={likes} className="ui label">
            Likes: {likes}
          </span>
          <span className="ui label">
            Added: {blog.user ? blog.user.username : 'unknown'}
          </span>
          <span className="ui label">Url: {blog.url}</span>

          <i
            id={`btnLike${index}`}
            onClick={() => addLikes()}
            className="thumbs up icon large"
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
