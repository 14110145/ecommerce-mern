import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../loading/Loading";
import BtnRender from "./BtnRender";

const ProductItem = ({ product, isAdmin }) => {
  const state = useContext(GlobalState);
  const [loading, setLoading] = useState(false);

  const addCart = state.userAPI.addCart;
  const [products, setProducts] = state.productsAPI.products;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;
  const deleteProducts = state.productsAPI.deleteProducts;

  const deleteProductBtn = async () => {
    try {
      setLoading(true);
      await deleteProducts(product._id, product.images.public_id);
      setLoading(false);
    } catch (error) {
      return alert(error.response.data.msg);
    }
    setCallbackProductAPI(!callbackProductAPI);
  };

  const handleCheck = () => {
    product.checked = !product.checked;
    setProducts([...products]);
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

      <img src={product.images[0].url} />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender
        isAdmin={isAdmin}
        product={product}
        addCartBtn={() => addCart(product)}
        deleteProductBtn={deleteProductBtn}
      />
    </div>
  );
};

export default ProductItem;
