import React from "react";

const BtnRender = ({ product }) => {
  return (
    <div className="row_btn">
      <Link id="btn_buy" to="#!">
        Buy
      </Link>
      <Link id="btn_view" to={`/detail/${product._id}`}>
        View
      </Link>
    </div>
  );
};

export default BtnRender;
