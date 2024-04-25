import React, { useState } from "react";
import "./Login.css";
import { login } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    login(username, password)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
      })
      .then(() => navigate("/home"))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">Login</div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
