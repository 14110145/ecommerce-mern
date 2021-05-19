import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Cart from "./icon/iconShoppingCart.svg";
import Close from "./icon/iconTimes.svg";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const myRef = useRef();

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

      <div className="header__navbar" ref={myRef}>
        <input type="checkbox" />
        <div className="navbar__burger">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            class="svg-inline--fa fa-bars fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </div>
        <ul className="navbar__link">
          <img src={Close} alt="" className="btnClose" />
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
      </div>

      {isAdmin ? null : (
        <div className="header__cart-icon">
          <span>{cart.length ? cart.length : 0}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
