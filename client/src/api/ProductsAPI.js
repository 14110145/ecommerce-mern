import axios from "axios";
import { useEffect, useState } from "react";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  const updateProducts = async (product, token) => {
    await axios.put(`/api/products/${product._id}`, product, { headers: { Authorization: token } });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
    updateProducts: updateProducts,
  };
};

export default ProductsAPI;
