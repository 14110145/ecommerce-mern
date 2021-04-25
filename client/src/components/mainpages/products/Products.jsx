import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import ProductItem from "../utils/product_item/ProductItem.jsx";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  console.log(products);
  return (
    <>
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
