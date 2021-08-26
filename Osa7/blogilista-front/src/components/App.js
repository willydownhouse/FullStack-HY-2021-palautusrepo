import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import BlogList from './BlogList';
import LoginForm from './LoginForm';
import Notification from './Notification';
import CreateBlog from './CreateBlog';
import Header from './Header';
import AllUsers from './AllUsers';
import { openForm, getAllBlogs } from '../actions';

const App = () => {
  const notification = useSelector(state => state.notification);
  const formOpen = useSelector(state => state.createBlogFormOpen);

  let currentUser = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log('currentuser: ', currentUser);
  return (
    <BrowserRouter>
      <div className="ui container">
        <Switch>
          <Route exact path="/">
            {currentUser ? (
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
          <Route path="/users">
            <Header />
            <AllUsers />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
