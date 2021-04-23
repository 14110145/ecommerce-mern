import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Products from "./products/Products";
import NotFound from "./utils/not_found/NotFound";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Pages;
