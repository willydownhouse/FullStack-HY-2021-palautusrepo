import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../actions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    //localStorage.removeItem('user');
    dispatch(logOut());
  };
  return (
    <>
      <div className="ui secondary menu">
        <Link className="item" to="/">
          Blogs
        </Link>
        <Link className="item" to="/users">
          Users
        </Link>

        <div className="right menu">
          <div className="item"></div>
          <Link onClick={handleLogout} className="ui item" to="/">
            Logout
          </Link>
        </div>
      </div>
      <p>{user} logged in</p>
    </>
  );
};

export default Header;
