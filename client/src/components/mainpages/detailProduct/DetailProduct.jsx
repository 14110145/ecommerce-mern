import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [indexBigImg, setIndexBigImg] = useState(0);
  const [detailProduct, setDetailProduct] = useState("");
  const myRef = useRef();

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
    // eslint-disable-next-line
  }, [params]);

  const handleTab = (index) => {
    if (myRef.current) {
      const images = myRef.current.children;
      for (let image of images) {
        image.className = "";
      }
      images[index].className = "active";
      setIndexBigImg(index);
    }
  };

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className="detail">
        <div className="big-img">
          <img
            src={`data:${detailProduct.images[indexBigImg].contentType};base64, ${detailProduct.images[indexBigImg].imagesBase64}`}
            alt=""
          />
          <div className="thumb" ref={myRef}>
            {detailProduct.images.map((image, index) => (
              <img
                src={`data:${image.contentType};base64, ${image.imagesBase64}`}
                alt=""
                key={index}
                onClick={() => handleTab(index)}
                className={index === 0 ? "active" : ""}
              />
            ))}
          </div>
        </div>
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>{detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>
            Buy now
          </Link>
        </div>
      </div>
      <div>
        <h2 style={{ marginLeft: "15px" }}>Related Product</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
