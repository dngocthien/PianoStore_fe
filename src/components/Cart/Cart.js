import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Cart.css";
import rm from "../../assets/remove.png";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) ?? []
  );

  const { qr } = useParams();

  useEffect(() => {
    if ([].includes(qr)) return;
    fetch("http://localhost:8081/products/" + qr)
      .then((res) => res.json())
      .then((result) => {
        updateCart(result[0].name, result[0].price, 1);
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function checkContain() {
    cart.map((p) => {
      console.log(p[0] + "/" + qr + "/");
      if (p[0] === qr) {
        console.log("true");
        return "true";
      }
    });
    console.log("false");
    return "false";
  }

  function updateCart(name, price, quantity) {
    let existing = cart.slice();
    let update = [...existing, [name, price, quantity]];
    return setCart(update);
  }

  function remove(index) {
    let existing = cart.slice();
    existing.splice(index, 1);
    return setCart(existing);
  }

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(",");
  }

  function sum() {
    let total = 0;
    cart.map((p) => {
      total += p[1];
    });
    return total;
  }
  return (
    <div className="cart">
      <h1> GIỎ HÀNG</h1>

      <div className="cart-table">
        <table cellspacing="0" cellpadding="0" align="center">
          <thead>
            <th>-</th>
            <th>SẢN PHẨM</th>
            <th>GIÁ</th>
            <th>SỐ LƯỢNG</th>
            <th>TẠM TÍNH</th>
          </thead>
          <tbody>
            {cart.map((p, index) => {
              return (
                <tr>
                  <td>
                    <img src={rm} onClick={() => remove(index)} />
                  </td>
                  <td>{p[0]}</td>
                  <td>{numberWithCommas(p[1])} đ</td>
                  <td>{p[2]}</td>
                  <td>{numberWithCommas(p[2] * p[1])} đ</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="cart-total">
          <p>Tổng cộng: {numberWithCommas(sum())} đ</p>
          <p>{checkContain()}</p>
          <button>THANH TOÁN</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
