import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit} className="login-page__login-form">
        <h2 className="login-form__title">Login</h2>
        <input
          type="email"
          name="email"
          className="login-form__input"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          className="login-form__input"
          autoComplete="on"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="login-form__row-btn">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
