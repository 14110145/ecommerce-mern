import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Cart from "./icon/iconShoppingCart.svg";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status === 200) {
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    }
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">{isAdmin ? "admin" : "eco-shop"}</Link>
      </div>

      <div className="header__navbar">
        <input type="checkbox" className="navbar__input" id="navbar__input" />

        <label className="navbar__overlay"></label>

        <ul className="navbar__link">
          <li>
            <Link to="/">{isAdmin ? "products" : "shopping"}</Link>
          </li>

          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter()
          ) : (
            <li>
              <Link to="/login">login - register</Link>
            </li>
          )}
        </ul>

        {isAdmin ? null : (
          <div className="navbar__cart-icon">
            <span className="cart-icon__span">{cart.length ? cart.length : 0}</span>
            <Link to="/cart">
              <img src={Cart} alt="" className="cart-icon__image" />
            </Link>
          </div>
        )}

        <label for="navbar__input" className="navbar__burger">
          <div className="burger__line--1"></div>
          <div className="burger__line--2"></div>
          <div className="burger__line--3"></div>
        </label>
      </div>
    </header>
  );
};

export default Header;
