import React, { useState } from 'react';

import blogsApi from '../apis/blogsApi';

const BlogItem = ({
  index,
  blog,
  blogs,
  setBlogs,
  user,
  setNotification,
  setErrMessage,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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
      blogsApi
        .delete(`/api/blogs/${blog.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setBlogs(blogs.filter(item => item.id !== blog.id));
          setNotification(`${blog.title} deleted succesfully!`);
          setTimeout(() => setNotification(null), 3000);
        })
        .catch(err => {
          setErrMessage(err.response.data.message);
          setTimeout(() => setErrMessage(null), 5000);
        });
    }
  };

  console.log(blog);

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
