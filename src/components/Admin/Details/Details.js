import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Details.css";
import { DB_URL } from "../../../constants";

function Details() {
  const [info, setInfo] = useState(null);
  const [cart, setCart] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetch(DB_URL + "cartByID/" + id)
      .then((res) => res.json())
      .then((result) => {
        setInfo(result);
      });
    fetch(DB_URL + "items/" + id)
      .then((res2) => res2.json())
      .then((result2) => {
        setCart(result2);
      });
  }, []);

  function printDocument() {
    const input = document.getElementById("exportDiv");

    html2canvas(input, {
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  }

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
        return "Đã huỷ";
      case 2:
        return "Đã nhận tiền";
      case 3:
        return "Nhận tiền khi giao";
      case 4:
        return "Đã giao";
      default:
        return "Chờ xử lý";
    }
  }
  return (
    <div className="admin">
      <div className="view-header">
        <h1>CHI TIẾT</h1>
        <button className="btn-border" onClick={() => printDocument()}>
          Export
        </button>
      </div>

      <div className="payment-body details">
        {info != null && (
          <div className="payment-body-section details-info">
            <h3>THÔNG TIN THANH TOÁN</h3>
            <p>
              <b>Tên khách hàng: </b>
              {info.name}
            </p>
            <p>
              <b>Địa chỉ: </b>
              {info.address}
            </p>
            <p>
              <b>Điện thoại: </b>
              {info.phone}
            </p>
            <p>
              <b>Lời nhắn: </b>
              {info.message}
            </p>
            <p>
              <b>Ngày đặt hàng: </b>
              {info.date}
            </p>
            <p>
              <b>Tình trạng: </b>
              {showStatus(info.status)}
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

      <div className="hiddenDiv">
        <div id="exportDiv">
          {info != null && (
            <div className="details-info">
              <h3>THÔNG TIN THANH TOÁN</h3>
              <p>
                <b>Tên khách hàng: </b>
                {info.name}
              </p>
              <p>
                <b>Địa chỉ: </b>
                {info.address}
              </p>
              <p>
                <b>Điện thoại: </b>
                {info.phone}
              </p>
              <p>
                <b>Lời nhắn: </b>
                {info.message}
              </p>
              <p>
                <b>Ngày đặt hàng: </b>
                {info.date}
              </p>
              <p>
                <b>Tình trạng: </b>
                {showStatus(info.status)}
              </p>
            </div>
          )}
          {cart.length > 0 && (
            <div className="">
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
    </div>
  );
}

export default Details;
