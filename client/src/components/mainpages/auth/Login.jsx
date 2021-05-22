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
      <form onSubmit={loginSubmit} className="login-page__form">
        <h2 className="login-page__title">Login</h2>
        <input
          type="email"
          name="email"
          className="login-page__input"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          className="login-page__input"
          autoComplete="on"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="login-page__row-btn">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
