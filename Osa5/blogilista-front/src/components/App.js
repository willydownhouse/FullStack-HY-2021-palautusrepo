import React from 'react';
import { useState, useEffect } from 'react';

import BlogList from './BlogList';
import LoginForm from './LoginForm';
import Notification from './Notification';
import CreateBlog from './CreateBlog';
import Header from './Header';
import Togglable from './Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) return;

    setUser(user.split(','));
  }, []);

  return (
    <div className="ui container">
      {user ? (
        <>
          <Header user={user[1]} setUser={setUser} />
          <Togglable btnLabel="Create new blog">
            <CreateBlog
              setNotification={setNotification}
              setErrMessage={setErrMessage}
              blogs={blogs}
              setBlogs={setBlogs}
              token={user[2]}
            />
          </Togglable>

          {errMessage || notification ? (
            <Notification errMessage={errMessage} message={notification} />
          ) : null}
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </>
      ) : (
        <>
          <LoginForm setErrMessage={setErrMessage} setUser={setUser} />
          {errMessage ? <Notification errMessage={errMessage} /> : null}
        </>
      )}
    </div>
  );
};

export default App;
