import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions';

const LoginForm = ({ setUser }) => {
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(login(userNameInput, passwordInput));
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
