import React from "react";
import { Link } from "react-router-dom";
import model from "../../assets/model.jpg";
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
      <img className="product-img" src={model} />
      <p>{product.name}</p>
      <p className="product-price">{numberWithCommas(product.price)} đ</p>
      <p>Còn lại: {product.remain}</p>
      <Link to={`/cart/${product.name}`} state={{ qr: product.name }}>
        <img className="product-add" src={cart} />
      </Link>
      <p className="product-secrete">.</p>
    </div>
  );
};
