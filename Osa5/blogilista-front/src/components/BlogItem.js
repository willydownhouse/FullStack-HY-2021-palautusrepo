import React, { useEffect, useState } from 'react';

import blogsApi from '../apis/blogsApi';

const BlogItem = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  useEffect(() => {
    blogsApi.patch(`/api/blogs/${blog.id}`, { likes }).then(res => {
      setLikes(res.data.data.likes);
    });
  }, [likes]);

  return (
    <div key={blog.id} className="item">
      <div className="right floated content">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="ui button"
        >
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="content">
        <div className="header">
          <h2 className="ui header">{blog.title}</h2>
        </div>
        <div
          className="meta"
          style={showDetails ? { display: '' } : { display: 'none' }}
        >
          <span className="ui label">Author: {blog.author}</span>
          <span className="ui label">Likes: {likes}</span>
          <span className="ui label">Added: {blog.user.username}</span>
          <i
            onClick={() => setLikes(likes + 1)}
            className="thumbs up icon large"
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
