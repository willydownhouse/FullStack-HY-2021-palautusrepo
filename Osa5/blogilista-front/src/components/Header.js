import React from 'react';

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return (
    <div className="ui middle aligned list">
      <div className="ui item">
        <div className="right floated content">
          <div onClick={handleLogout} className="ui secondary button">
            Log out
          </div>
        </div>
        <p>{user} logged in</p>
      </div>
    </div>
  );
};

export default Header;
