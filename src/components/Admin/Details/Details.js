import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Details.css";

function Details() {
  const [info, setInfo] = useState(null);
  const [cart, setCart] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:8081/cartByID/" + id)
      .then((res) => res.json())
      .then((result) => {
        setInfo(result);
      });
    fetch("http://localhost:8081/items/" + id)
      .then((res2) => res2.json())
      .then((result2) => {
        setCart(result2);
      });
  }, []);

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(",");
  }

  function sum() {
    let count = 0;
    cart.map((p) => {
      count += p.unitPrice * p.quantity;
    });
    return count;
  }

  function showStatus(s) {
    switch (s) {
      case 0:
        return "Chờ xử lý";
      case 1:
        return "Hoàn thành";
      case 2:
        return "Đã huỷ";
    }
  }
  return (
    <div className="admin">
      <h1>CHI TIẾT</h1>
      <div className="payment-body details">
        {info != null && (
          <div className="payment-body-section details-info">
            <h3>THÔNG TIN THANH TOÁN</h3>
            <p>
              Tên khách hàng: <b>{info.name}</b>
            </p>
            <p>
              Địa chỉ: <b>{info.address}</b>
            </p>
            <p>
              Điện thoại: <b>{info.phone}</b>
            </p>
            <p>
              Lời nhắn: <b>{info.message}</b>
            </p>
            <p>
              Ngày đặt hàng: <b>{info.date}</b>
            </p>
            <p>
              Tình trạng: <b>{showStatus(info.status)}</b>
            </p>
          </div>
        )}

        {cart.length > 0 && (
          <div className="payment-body-section payment-body-section-cart">
            <h3>ĐƠN HÀNG</h3>
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
                        {p.productName}
                        <b> x {p.quantity}</b>
                      </td>
                      <td>{numberWithCommas(p.unitPrice * p.quantity)}đ</td>
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
        )}
      </div>
    </div>
  );
}

export default Details;
