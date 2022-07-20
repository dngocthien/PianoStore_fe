import React from "react";
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
      {product.discount > 0 ? (
        <div
          className="product-discount"
          style={{
            backgroundImage:
              "url(" + require("../../assets/discount.png") + ")",
          }}
        >
          <p>-{product.discount}%</p>
        </div>
      ) : (
        <></>
      )}
      <img
        className="product-img"
        src={product.image !== null ? product.image : model}
      />
      <p className="product-name">{product.name}</p>

      {product.discount > 0 ? (
        <>
          <p className="product-oldprice">{numberWithCommas(product.price)}đ</p>
          <p className="product-price">
            {numberWithCommas(product.price * (1 - product.discount / 100))}đ
          </p>
          <p className="product-remain">
            {product.remain ? "Còn hàng" : "Hết hàng"}
          </p>
        </>
      ) : (
        <>
          <p className="product-oldprice-none">&nbsp;</p>
          <p className="product-price">{numberWithCommas(product.price)}đ</p>
          <p className="product-remain">
            {product.remain ? "Còn hàng" : "Hết hàng"}
          </p>
          <p className="product-oldprice-none">&nbsp;</p>
        </>
      )}

      <img className="product-add" src={cart} onClick={() => toCart()} />
      {/* <Link to={`/cart/${product.name}`} state={{ qr: product.name }}>
      </Link> */}
      <p className="product-secrete">.</p>
    </div>
  );
};
