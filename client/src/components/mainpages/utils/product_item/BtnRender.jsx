import React from "react";
import { Link } from "react-router-dom";

const BtnRender = ({ product, deleteProductBtn, addCartBtn, isAdmin }) => {
  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link id="btn_buy" to="#!" onClick={deleteProductBtn}>
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!" onClick={addCartBtn}>
            Buy
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
