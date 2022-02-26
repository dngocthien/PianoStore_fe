import { useState } from "react";
import { Link } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) ?? []
  );
  const [bank, setBank] = useState(true);

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

  function changeMethod(check) {
    setBank(check);
  }
  return (
    <div className="payment">
      <h1>THANH TOÁN</h1>
      <p>Cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm của chúng tôi!</p>
      <div className="payment-body">
        <div className="payment-body-section">
          <h3>THÔNG TIN THANH TOÁN</h3>
          <input placeholder="Tên"></input>
          <input placeholder="Địa chỉ"></input>
          <input placeholder="Điện thoại"></input>
          <textarea rows="5" placeholder="Lời nhắn"></textarea>
        </div>
        <div className="payment-body-section payment-body-section-cart">
          <h3>ĐƠN HÀNG CỦA BẠN</h3>
          <table>
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th>TẠM TÍNH</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {p[0]}
                      <b> x {p[2]}</b>
                    </td>
                    <td>{numberWithCommas(p[2] * p[1])}đ</td>
                  </tr>
                );
              })}
              <tr className="table-break">
                <td colSpan="100%"></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <b>Tổng cộng:</b>
                </td>
                <td>
                  <b>{numberWithCommas(sum())}đ</b>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="payment-body-section">
          <h3>HÌNH THỨC THANH TOÁN</h3>
          <div className="payment-body-section-row">
            <input
              type="checkbox"
              checked={bank}
              onClick={() => changeMethod(true)}
            ></input>
            <p>Chuyển khoản ngân hàng</p>
          </div>
          <div className="payment-body-section-row">
            <input
              type="checkbox"
              checked={!bank}
              onClick={() => changeMethod(false)}
            ></input>
            <p>Trả tiền mặt khi nhận hàng</p>
          </div>
          <div className="payment-body-section-payment">
            <Link to={"/thankyou"}>
              <button>TIẾN HÀNH THANH TOÁN</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
