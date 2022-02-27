import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) ?? []
  );
  const [bank, setBank] = useState(true);
  const [invalidName, setInvalidName] = useState("");
  const [invalidAddress, setInvalidAddress] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");

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

  const navigate = useNavigate();
  function isNameOk(name) {
    if (name == "" || name == null) {
      return false;
    } else return true;
  }
  function isAddressOK(address) {
    if (address == "" || address == null) {
      return false;
    } else return true;
  }
  function isPhoneOK(phone) {
    if (
      phone != null &&
      /[^a-zA-Z]/.test(phone) &&
      phone.match(/\d/g).length === 10
    ) {
      return true;
    } else return false;
  }
  function checkingInfo() {
    let name = document.getElementById("info-name").value;
    if (isNameOk(name)) {
      setInvalidName("200");
    } else {
      setInvalidName("Bạn cần nhập tên!");
    }

    let address = document.getElementById("info-address").value;
    if (isAddressOK(address)) {
      setInvalidAddress("200");
    } else {
      setInvalidAddress("Bạn cần nhập địa chỉ!");
    }

    let phone = document.getElementById("info-phone").value;
    if (phone == "" || phone == null) {
      setInvalidPhone("Bạn cần nhập số điện thoại!");
    } else if (isPhoneOK(phone)) {
      setInvalidPhone("200");
    } else {
      setInvalidPhone("Số điện thoại không hợp lệ!");
    }

    if (isNameOk(name) && isAddressOK(address) && isPhoneOK(phone)) {
      navigate("/thankyou");
    }
  }
  return (
    <div className="payment">
      <h1>THANH TOÁN</h1>
      <p>Cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm của chúng tôi!</p>
      <div className="payment-body">
        <div className="payment-body-section">
          <h3>THÔNG TIN THANH TOÁN</h3>
          {invalidName != "200" && (
            <p className="info-invalid">{invalidName}</p>
          )}
          <input id="info-name" placeholder="Tên"></input>
          {invalidAddress != "200" && (
            <p className="info-invalid">{invalidAddress}</p>
          )}
          <input id="info-address" placeholder="Địa chỉ"></input>
          {invalidPhone != "200" && (
            <p className="info-invalid">{invalidPhone}</p>
          )}
          <input id="info-phone" placeholder="Điện thoại"></input>
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
              onChange={() => changeMethod(true)}
            ></input>
            <p>Chuyển khoản ngân hàng</p>
          </div>
          <div className="payment-body-section-row">
            <input
              type="checkbox"
              checked={!bank}
              onChange={() => changeMethod(false)}
            ></input>
            <p>Trả tiền mặt khi nhận hàng</p>
          </div>
          <div className="payment-body-section-payment">
            {/* <Link to={"/thankyou"}>
              <button>TIẾN HÀNH THANH TOÁN</button>
            </Link> */}
            <button onClick={() => checkingInfo()}>TIẾN HÀNH THANH TOÁN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
