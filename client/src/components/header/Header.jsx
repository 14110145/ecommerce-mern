import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/iconBars.svg";
import Cart from "./icon/iconShoppingCart.svg";
import Close from "./icon/iconTimes.svg";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create-product">Create Product</Link>
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
      localStorage.clear();
      setIsLogged(false);
      setIsAdmin(false);
      alert(res.data.msg);
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
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "admin" : "eco-shop"}</Link>
        </h1>
      </div>

      <ul>
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

        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? null : (
        <div className="cart-icon">
          <span>0</span>
          <Link to="#!">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
