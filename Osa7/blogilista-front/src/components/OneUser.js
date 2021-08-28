import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function OneUser(props) {
  const id = useParams().id;
  const user = useSelector(state => state.users.find(user => user._id === id));

  console.log(user);
  const renderBlogTitles = () => {
    if (user.blogs.length === 0) {
      return <h3>{`${user.username} has not added blogs.`}</h3>;
    }

    return user.blogs.map(blog => {
      return (
        <div key={blog.id} className="item">
          <h4 className="ui header">{blog.title}</h4>
        </div>
      );
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="ui header">{user.username}</h2>
      <div className="ui relaxed divided list">
        <h2 className="ui header">Added blogs</h2>
        {renderBlogTitles()}
      </div>
    </div>
  );
}

export default OneUser;
