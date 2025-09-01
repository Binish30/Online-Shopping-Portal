// src/pages/LoginSignUp/LoginSignUp.jsx

import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [phone, setPhone] = useState();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login form submitted:", formData);
    let responseData;
    await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password }), // Only send email and password for login
    })
    .then(res => res.json())
    .then(data => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("username", responseData.username);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("Signup form submitted:", { ...formData, phone });
    let responseData;
    await fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, phone }),
    })
    .then(res => res.json())
    .then(data => responseData = data);
    
    if (responseData.success) {
      alert(responseData.success);
      setState("Login");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <div className="row">
              <div className="col">
                <input
                  name="firstName" // <-- Crucial: Must match state key
                  value={formData.firstName}
                  onChange={changeHandler}
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                />
              </div>
              <div className="col">
                <input
                  name="lastName" // <-- Crucial: Must match state key
                  value={formData.lastName}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                />
              </div>
            </div>
          )}
          <input
            name="email" // <-- Crucial: Must match state key
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            className="form-control"
          />
          {state === "Sign Up" && (
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              defaultCountry="IN"
              international
            />
          )}
          <input
            name="password" // <-- Crucial: Must match state key
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={() => (state === "Login" ? login() : signup())}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" className="form-check-input" id="agree-checkbox" />
          <label htmlFor="agree-checkbox">
            By Continuing, I Agree to the Terms of Use and Privacy Policy.
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;