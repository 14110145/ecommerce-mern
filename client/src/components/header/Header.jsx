import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/iconBars.svg";
import Cart from "./icon/iconShoppingCart.svg";
import Close from "./icon/iconTimes.svg";

const Header = () => {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">Eco-Shop</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login - Register</Link>
        </li>
        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      <div className="cart-icon">
        <span>0</span>
        <Link to="#!">
          <img src={Cart} alt="" width="30" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
