import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoryAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get(`/user/refresh_token`);
        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 9 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(token),
    userAPI: UserAPI(token),
    categoriesAPI: CategoryAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
