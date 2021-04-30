import axios from "axios";
import { useState } from "react";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  const updateProducts = async (product, token) => {
    await axios.put(`/api/products/${product._id}`, product, { headers: { Authorization: token } });
  };

  return {
    products: [products, setProducts],
    updateProducts: updateProducts,
    getProducts: getProducts,
  };
};

export default ProductsAPI;
