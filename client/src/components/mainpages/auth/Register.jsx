import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <h2>Register</h2>

      <form onSubmit={registerSubmit}>
        <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput} />

        <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />

        <input
          type="password"
          name="password"
          autoComplete="on"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
