import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

function Login({ show, setNotification, setLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      setNotification(err.message);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const user = {
        id: result.data.login.user,
        favoriteGenre: result.data.login.favoriteGenre,
      };
      localStorage.setItem("token", JSON.stringify(result.data.login.value));
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          required
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
