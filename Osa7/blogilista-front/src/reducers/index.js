import { combineReducers } from 'redux';

import notificationReducer from './notificationReducer';
import blogsReducer from './blogsReducer';
import authReducer from './authReducer';
import createBlogFormReducer from './createBlogFormReducer';

export default combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  createBlogFormOpen: createBlogFormReducer,
  notification: notificationReducer,
});
