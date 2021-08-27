import blogsApi from '../apis/blogsApi';

export const setCurrentUserFromLocalStorage = loggedInUser => {
  return {
    type: 'SET_CURRENT_USER',
    payload: loggedInUser,
  };
};

export const login = (username, password) => async dispatch => {
  try {
    const res = await blogsApi.post('/api/users/login', {
      username,
      password,
    });
    console.log(res.data);

    localStorage.setItem(
      'user',
      JSON.stringify({
        user: res.data.user,
        userId: res.data.userId,
        token: res.data.token,
      })
    );

    dispatch({
      type: 'LOG_IN',
      payload: {
        user: res.data.user,
        userId: res.data.userId,
        token: res.data.token,
      },
    });
  } catch (err) {
    console.log(err.response);
    dispatch(setNotification(err.response.data.message));
  }
};
export const logOut = () => {
  localStorage.removeItem('user');
  return {
    type: 'LOG_OUT',
  };
};

export const closeForm = () => {
  return {
    type: 'CLOSE_FORM',
  };
};

export const openForm = () => {
  return {
    type: 'OPEN_FORM',
  };
};

export const getAll = type => async dispatch => {
  const res = await blogsApi.get(`/api/${type}`);
  const docs =
    type === 'blogs'
      ? res.data.data.sort((a, b) => b.likes - a.likes)
      : res.data.data;

  if (type === 'blogs') {
    dispatch({
      type: 'GET_ALL_BLOGS',
      payload: docs,
    });
  }

  if (type === 'users') {
    dispatch({
      type: 'GET_ALL_USERS',
      payload: docs,
    });
  }
};

export const createBlog = (data, token) => async dispatch => {
  try {
    const res = await blogsApi.post('/api/blogs', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'CREATE_BLOG',
      payload: res.data.newBlog,
    });
    dispatch(setNotification(`${res.data.newBlog.title} succesfully created!`));
    dispatch(closeForm());
  } catch (err) {
    dispatch(setNotification(err.response.data.message));
  }
};

export const deleteBlog = (id, token) => async dispatch => {
  await blogsApi.delete(`/api/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch({
    type: 'DELETE_BLOG',
    payload: id,
  });
};

export const likeABlog = (id, likes) => async dispatch => {
  const res = await blogsApi.patch(`/api/blogs/${id}`, {
    likes: likes + 1,
  });

  dispatch({
    type: 'LIKE_A_BLOG',
    payload: res.data.data,
  });
};

export const setNotification = message => dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: message,
  });

  setTimeout(() => {
    dispatch({
      type: 'HIDE_NOTIFICATION',
    });
  }, 4000);
};
