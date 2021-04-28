import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import DetailProduct from "./detailProduct/DetailProduct";
import Products from "./products/Products";
import NotFound from "./utils/not_found/NotFound";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />

      <Route path="/login" exact component={isLogged ? NotFound : Login} />

      <Route path="/register" exact component={isLogged ? NotFound : Register} />

      <Route path="/cart" exact component={Cart} />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Pages;
