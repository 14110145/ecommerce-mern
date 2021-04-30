import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../loading/Loading";
import BtnRender from "./BtnRender";

function ProductItem({ product, isAdmin }) {
  const state = useContext(GlobalState);
  const [loading, setLoading] = useState(false);

  const updateProducts = state.productsAPI.updateProducts;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;
  const [token] = state.token;

  const deleteProduct = async () => {
    try {
      setLoading(true);
      await axios.post("/api/destroy", { public_id: product.images.public_id }, { headers: { Authorization: token } });
      await axios.delete(`/api/products/${product._id}`, { headers: { Authorization: token } });
      setLoading(false);
      setCallbackProductAPI(!callbackProductAPI);
    } catch (error) {
      return alert(error.response.data.msg);
    }
  };

  const handleCheck = () => {
    product.checked = !product.checked;
    updateProducts(product, token);
    setCallbackProductAPI(!callbackProductAPI);
  };

  if (loading)
    return (
      <div className="product_card">
        <Loading />
      </div>
    );

  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} onChange={handleCheck} />}

      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
