import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    console.log(res);
  };
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return {
    products: [products],
  };
};

export default ProductsAPI;
