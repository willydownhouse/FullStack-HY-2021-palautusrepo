import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeABlog } from '../actions';

import AddCommentForm from './AddCommentForm';

function BlogDetails(props) {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id));

  const addLikes = () => {
    dispatch(likeABlog(blog.id, blog.likes));
  };

  if (!blog) return null;

  return (
    <div className="content">
      <div className="header">
        <Link className="ui header" to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
        <p id="author" style={{ marginBottom: '4px' }}>
          Author: {blog.author}
        </p>
      </div>

      <div className="meta">
        <span value={blog.likes} className="ui label">
          Likes: {blog.likes}
        </span>
        <span className="ui label">
          Added: {blog.user ? blog.user.username : 'unknown'}
        </span>
        <span className="ui label">Url: {blog.url}</span>

        <i
          onClick={() => addLikes()}
          className="thumbs up icon large"
          style={{ cursor: 'pointer' }}
        ></i>
      </div>
      <div className="ui hidden divider"></div>
      <AddCommentForm id={blog.id} />
      <div className="ui hidden divider"></div>

      <div className="content">
        <div className="ui header">Comments</div>
        {blog.comments.length === 0
          ? 'No comments for this blog yet'
          : blog.comments.map((comment, i) => {
              return <p key={i}>{comment}</p>;
            })}
      </div>
    </div>
  );
}

export default BlogDetails;
