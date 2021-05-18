import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Filter from "../utils/filter/Filter";
import Loading from "../utils/loading/Loading";
import Loadmore from "../utils/loadmore/Loadmore";
import ProductItem from "../utils/product_item/ProductItem.jsx";

const Products = () => {
  const state = useContext(GlobalState);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;
  const deleteProducts = state.productsAPI.deleteProducts;

  useEffect(() => {
    setCallbackProductAPI(!callbackProductAPI);
  }, []);

  const checkAll = () => {
    setIsChecked(!isChecked);
    products.forEach((product) => {
      product.checked = !isChecked;
    });
    setProducts([...products]);
  };

  const deleteAll = () => {
    products.forEach(async (product) => {
      if (product.checked) {
        setLoading(true);
        await deleteProducts(product._id, product.images);
        setCallbackProductAPI(!callbackProductAPI);
        setLoading(false);
      }
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Filter />
      {isAdmin && (
        <div className="delete-all">
          <span>select all</span>
          <input type="checkbox" checked={isChecked} onChange={checkAll} />
          <button onClick={deleteAll}>delete select</button>
        </div>
      )}
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
        ))}
      </div>
      <Loadmore />
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
