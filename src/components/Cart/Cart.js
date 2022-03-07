import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import rm from "../../assets/remove.png";
import "./Cart.css";
import { DB_URL } from "../../constants";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) ?? []
  );
  const [total, setTotal] = useState(0);

  const { qr } = useParams();

  useEffect(() => {
    if (typeof qr == "undefined") return;
    if (checkContain()) return;
    fetch(DB_URL + "products/" + qr)
      .then((res) => res.json())
      .then((result) => {
        updateCart(result[0].name, result[0].price, 1);
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
    setTotal(sum());
  }, [cart]);

  function checkContain() {
    let check = false;
    cart.map((p) => {
      if (p[0] === qr) {
        check = true;
      }
    });

    return check;
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
    let count = 0;
    cart.map((p) => {
      count += p[1] * p[2];
    });
    return count;
  }

  function updateQuantity(index, val) {
    let existing = cart.slice();
    let newVal = JSON.parse(existing[index][2]) + val;
    if (newVal > 0) existing[index][2] = newVal;
    setCart(existing);
  }

  return (
    <div className="cart">
      <h1> GIỎ HÀNG</h1>
      {cart.length < 1 ? (
        <div className="cart-null">
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <Link to={"/products"}>
            <button>TIẾP TỤC MUA HÀNG</button>
          </Link>
        </div>
      ) : (
        <div className="cart-table">
          <div className="cart-table1">
            <table>
              <thead>
                <tr>
                  <th>-</th>
                  <th>SẢN PHẨM</th>
                  <th>GIÁ</th>
                  <th>SỐ LƯỢNG</th>
                  <th>TẠM TÍNH</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((p, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={rm} onClick={() => remove(index)} />
                      </td>
                      <td>{p[0]}</td>
                      <td>{numberWithCommas(p[1])}đ</td>
                      <td className="cart-table-quantity">
                        <p
                          className="cart-table-quantity-volumn"
                          onClick={() => updateQuantity(index, -1)}
                        >
                          -
                        </p>
                        <p className="cart-table-quantity-number">{p[2]}</p>
                        <p
                          className="cart-table-quantity-volumn"
                          onClick={() => updateQuantity(index, 1)}
                        >
                          +
                        </p>
                      </td>
                      <td>{numberWithCommas(p[2] * p[1])}đ</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-table2">
            <table>
              <tbody>
                {cart.map((p, index) => {
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "highlight" : ""}
                    >
                      <td>
                        <img src={rm} onClick={() => remove(index)} />
                      </td>
                      <td>
                        <p>
                          <b>Sản phẩm:</b>
                        </p>
                        <p>{p[0]}</p>
                      </td>
                      <td>
                        <p>
                          <b>Giá:</b>
                        </p>
                        <p>{numberWithCommas(p[1])}đ</p>
                      </td>
                      <td>
                        <p>
                          <b>Số lượng:</b>
                        </p>
                        <div className="cart-table-quantity">
                          <p
                            className="cart-table-quantity-volumn"
                            onClick={() => updateQuantity(index, -1)}
                          >
                            -
                          </p>
                          <p className="cart-table-quantity-number">{p[2]}</p>
                          <p
                            className="cart-table-quantity-volumn"
                            onClick={() => updateQuantity(index, 1)}
                          >
                            +
                          </p>
                        </div>
                      </td>
                      <td>
                        <p>
                          <b>Tạm tính:</b>
                        </p>
                        <p>{numberWithCommas(p[2] * p[1])}đ</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-end">
            <p>Tổng cộng: {numberWithCommas(total)}đ</p>
            <div className="cart-end-nav">
              <Link to={"/products"}>
                <button>TIẾP TỤC MUA HÀNG</button>
              </Link>
              <Link to={"/cart/payment"}>
                <button>THANH TOÁN</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
