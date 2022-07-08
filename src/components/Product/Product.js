import React, { useState } from "react";
import { Link } from "react-router-dom";
import model from "../../assets/model.jpg";
import cart from "../../assets/cart.png";
import { useNavigate } from "react-router-dom";

import "./Product.css";

export const Product = ({ product }) => {
  const navigate = useNavigate();

  function toCart() {
    if (product.remain < 1) {
      alert("Sản phẩm đang tạm thời hết hàng!");
    } else {
      navigate(`/cart/${product.name}`, { state: { qr: product.name } });
    }
  }

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(",");
  }
  return (
    <div className="product">
      <img
        className="product-img"
        src={product.image !== null ? product.image : model}
      />
      <p>{product.name}</p>
      <p className="product-price">{numberWithCommas(product.price)}đ</p>
      <p>{product.remain ? "Còn hàng" : "Hết hàng"}</p>
      <img className="product-add" src={cart} onClick={() => toCart()} />
      {/* <Link to={`/cart/${product.name}`} state={{ qr: product.name }}>
      </Link> */}
      <p className="product-secrete">.</p>
    </div>
  );
};
