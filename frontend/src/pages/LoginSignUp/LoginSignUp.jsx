import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import './LoginSignUp.css';
import { Link } from "react-router-dom";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
      body: JSON.stringify({ email: formData.email, password: formData.password }),
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
                  name="first_name"
                  value={formData.first_name}
                  onChange={changeHandler}
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                />
              </div>
              <div className="col">
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                />
              </div>
            </div>
          )}
          <input
            name="email"
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
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            className="form-control"
          />
          {state === "Login" && (
            <div className="text-end mt-1" style={{ fontSize: '0.9rem' }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          )}
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