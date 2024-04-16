import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { GiConfirmed } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";
import "./Signup.css";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [isDisabled, setIsDisabled] = useState(false);
  let isDisabled = false;

  const passwordRequirements = {
    minLength: password.length >= 8,
    hasSpecialChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password),
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
  };
  isDisabled = !(
    passwordRequirements.hasNumber &&
    passwordRequirements.hasSpecialChar &&
    passwordRequirements.hasUppercase &&
    passwordRequirements.minLength &&
    confirmPassword
  );

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/signup", {
        username,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="error-message-container">
          {errorMessage && (
            <div className="error-message">
              <MdError
                style={{ verticalAlign: "middle", marginRight: "5px" }}
              />
              {errorMessage}
            </div>
          )}
        </div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="password-hints">
          <p>Password must:</p>
          <ul>
            <li className={passwordRequirements.minLength ? "met" : "unmet"}>
              {passwordRequirements.minLength ? (
                <GiConfirmed />
              ) : (
                <MdErrorOutline />
              )}{" "}
              Be at least 8 characters long
            </li>
            <li
              className={passwordRequirements.hasSpecialChar ? "met" : "unmet"}
            >
              {passwordRequirements.hasSpecialChar ? (
                <GiConfirmed />
              ) : (
                <MdErrorOutline />
              )}
              Include special characters (e.g., !@#$%)
            </li>
            <li className={passwordRequirements.hasNumber ? "met" : "unmet"}>
              {passwordRequirements.hasNumber ? (
                <GiConfirmed />
              ) : (
                <MdErrorOutline />
              )}{" "}
              Contain at least one number
            </li>
            <li className={passwordRequirements.hasUppercase ? "met" : "unmet"}>
              {passwordRequirements.hasUppercase ? (
                <GiConfirmed />
              ) : (
                <MdErrorOutline />
              )}{" "}
              Have at least one uppercase letter
            </li>
          </ul>
        </div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          className="signup-input"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <button
          className="signup-button"
          onClick={handleSignup}
          disabled={isDisabled}
          style={isDisabled ? { color: "gray", backgroundColor: "#ccc" } : {}}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
