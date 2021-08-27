import { combineReducers } from 'redux';

import notificationReducer from './notificationReducer';
import blogsReducer from './blogsReducer';
import authReducer from './authReducer';
import createBlogFormReducer from './createBlogFormReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  users: usersReducer,
  createBlogFormOpen: createBlogFormReducer,
  notification: notificationReducer,
});
