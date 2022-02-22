import React from "react";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.png";

import "./Product.css";

export const Product = ({ product }) => {
  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  return (
    <div className="product">
      <div className="product-info">
        <img src={logo} />
        <p>{product.name}</p>
        <p className="product-info-price">
          {numberWithCommas(product.price)} đ
        </p>
        <p>Còn lại: {product.remain}</p>
      </div>
      <img className="product-add" src={cart} />
    </div>
  );
};
