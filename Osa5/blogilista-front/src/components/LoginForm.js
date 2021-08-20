import React, { useState } from 'react';

import blogsApi from '../apis/blogsApi';

const LoginForm = ({ setUser, setErrMessage }) => {
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();

    blogsApi
      .post('/api/users/login', {
        username: userNameInput,
        password: passwordInput,
      })
      .then(res => {
        console.log(res.data);

        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch(err => {
        setErrMessage(err.response.data.message);
        setTimeout(() => {
          setErrMessage(null);
        }, 3000);
      });
  };

  return (
    <div>
      <h1 className="ui header">Log in to application</h1>
      <form className="ui form" onSubmit={onFormSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            id="username"
            value={userNameInput}
            onChange={e => setUserNameInput(e.target.value)}
            type="text"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            id="password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            type="text"
          />
        </div>
        <button id="btnLogin" className="ui button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
