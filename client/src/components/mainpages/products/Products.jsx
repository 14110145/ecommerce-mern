import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import ProductItem from "../utils/product_item/ProductItem.jsx";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;

  useEffect(() => {
    console.log("Run effect Products");
    setCallbackProductAPI(!callbackProductAPI);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
        ))}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
