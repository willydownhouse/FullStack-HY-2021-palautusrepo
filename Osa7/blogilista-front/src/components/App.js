import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { openForm, setCurrentUserFromLocalStorage } from '../actions';

import BlogList from './BlogList';
import LoginForm from './LoginForm';
import Notification from './Notification';
import CreateBlog from './CreateBlog';
import Header from './Header';
import AllUsers from './AllUsers';
import OneUser from './OneUser';
import BlogDetails from './BlogDetails';

const App = () => {
  const notification = useSelector(state => state.notification);
  const formOpen = useSelector(state => state.createBlogFormOpen);
  let isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  console.log('app rerender');

  let currentUser = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedInUser) return;

    dispatch(setCurrentUserFromLocalStorage(loggedInUser));
  }, []);

  console.log('currentuser: ', currentUser, 'loggedIn:', isLoggedIn);

  return (
    <BrowserRouter>
      <div className="ui container">
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              <>
                <Header user={currentUser.user} />
                {formOpen ? (
                  <CreateBlog token={currentUser.token} />
                ) : (
                  <div
                    onClick={() => dispatch(openForm())}
                    className="ui button"
                  >
                    Create new blog
                  </div>
                )}
                {notification ? <Notification /> : null}
                <BlogList user={currentUser} />
              </>
            ) : (
              <>
                <LoginForm />
                {notification ? <Notification /> : null}
              </>
            )}
          </Route>
          <Route path="/users/:id">
            <Header />
            <OneUser />
          </Route>
          <Route exact path="/users">
            <Header />
            <AllUsers />
          </Route>
          <Route path="/blogs/:id">
            <Header />
            <BlogDetails />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
