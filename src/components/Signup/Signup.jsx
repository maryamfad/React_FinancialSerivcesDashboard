import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";
import "./Signup.css";
import { signUp } from "../../services/AuthServices";
import { insertUserIntoUsers } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSignup = async (event) => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    event.preventDefault();
    try {
      await signUp(email, password)
        .then((user) => insertUserIntoUsers(email, password))
        .then(() => navigate("/home"))
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-title">Sign Up</div>
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
        <label htmlFor="email">email</label>
        <input
          type="text"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
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
