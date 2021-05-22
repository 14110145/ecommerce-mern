import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    matchPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!(user.password === user.matchPassword)) return toast.error("Password does not match!");
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit} className="login-page__form">
        <h2 className="login-page__title">Register</h2>
        <input
          type="text"
          name="name"
          className="login-page__input"
          required
          placeholder="Name"
          value={user.name}
          onChange={onChangeInput}
        />

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
        <input
          type="password"
          name="matchPassword"
          className="login-page__input"
          autoComplete="on"
          required
          placeholder="Confirm Password"
          value={user.matchPassword}
          onChange={onChangeInput}
        />

        <div className="login-page__row-btn">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
