import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAll } from '../actions';

function AllUsers(props) {
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll('users'));
  }, []);

  console.log(users);

  const renderUsers = () => {
    return users.map(user => {
      return (
        <div key={user._id} className="item">
          <i className="large user middle aligned icon"></i>
          <div className="content">
            <Link className="ui header" to={`/users/${user._id}`}>
              {user.username}
            </Link>
            <div className="description">{`Blogs: ${user.blogs.length}`}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="ui relaxed divided list">
      <h2 className="ui header">Users</h2>
      {renderUsers()}
    </div>
  );
}

export default AllUsers;
