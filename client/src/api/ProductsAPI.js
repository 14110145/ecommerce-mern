import axios from "axios";
import { useEffect, useState } from "react";

const ProductsAPI = (token) => {
  const [products, setProducts] = useState([]);
  const [callbackProductAPI, setCallbackProductAPI] = useState(false);

  // useEffect(() => {
  //   console.log("Run effect ProductAPI");
  //   const getProducts = async () => {
  //     const res = await axios.get("/api/products");
  //     setProducts(res.data.products);
  //   };

  //   getProducts();
  // }, [callbackProductAPI]);

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  const updateProducts = async (product, token) => {
    await axios.put(`/api/products/${product._id}`, product, { headers: { Authorization: token } });
  };

  const deleteProducts = async (id, public_id) => {
    try {
      await axios.post("/api/destroy", { public_id }, { headers: { Authorization: token } });
      await axios.delete(`/api/products/${id}`, { headers: { Authorization: token } });
    } catch (error) {
      return alert(error.response.data.msg);
    }
  };

  return {
    products: [products, setProducts],
    updateProducts,
    deleteProducts,
    getProducts,
    callbackProductAPI: [callbackProductAPI, setCallbackProductAPI],
  };
};

export default ProductsAPI;
