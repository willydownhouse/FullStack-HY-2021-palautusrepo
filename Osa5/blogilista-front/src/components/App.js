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
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    if (!user) return;

    setUser(user);
  }, []);

  return (
    <div className="ui container">
      {user ? (
        <>
          <Header user={user.user} setUser={setUser} />
          <Togglable btnLabel1="Create new blog" btnLabel2="Cancel">
            <CreateBlog
              setNotification={setNotification}
              setErrMessage={setErrMessage}
              blogs={blogs}
              setBlogs={setBlogs}
              token={user.token}
            />
          </Togglable>

          {errMessage || notification ? (
            <Notification errMessage={errMessage} message={notification} />
          ) : null}
          <BlogList
            setErrMessage={setErrMessage}
            setNotification={setNotification}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
          />
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
