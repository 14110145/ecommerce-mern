import axios from "axios";
import { useEffect, useState } from "react";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callbackProductAPI, setCallbackProductAPI] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    };

    getProducts();
  }, [callbackProductAPI]);

  const updateProducts = async (product, token) => {
    await axios.put(`/api/products/${product._id}`, product, { headers: { Authorization: token } });
  };

  return {
    products: [products, setProducts],
    updateProducts: updateProducts,
    callbackProductAPI: [callbackProductAPI, setCallbackProductAPI],
  };
};

export default ProductsAPI;
