import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import icon_details from "../../../assets/details.png";
import icon_search from "../../../assets/search.png";
import icon_sort from "../../../assets/sort.png";
import icon_delete from "../../../assets/delete.png";
import loading from "../../../assets/loading.gif";
import "./AdminOrders.css";
import { DB_URL } from "../../../constants";

function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [carts, setCarts] = useState([]);
  const [currentCarts, setCurrentCarts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [range, setRange] = useState(1);
  const statuses = [
    { label: "Chờ xử lý", value: 0 },
    { label: "Đã huỷ", value: 1 },
    { label: "Đã nhận tiền", value: 2 },
    { label: "Nhận tiền khi giao hàng", value: 3 },
    { label: "Đã giao", value: 4 },
  ];

  useEffect(() => {
    fetch(DB_URL + "carts/" + searchQuery)
      .then((res) => res.json())
      .then((result) => {
        let rev = [...result].reverse();
        setResponse(rev);
        updatePage(rev);
      });
  }, [searchQuery]);

  function updateInfo(index, newStatus) {
    let existing = currentCarts[index];
    existing.status = newStatus.value;

    fetch(DB_URL + "updateCart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existing),
    });
  }

  function removeOrder(id) {
    fetch(DB_URL + "deleteCart/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    }).then(() => {
      fetch(DB_URL + "carts")
        .then((res) => res.json())
        .then((result) => {
          let rev = [...result].reverse();
          setResponse(rev);
          updatePage(rev);
        });
    });
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

  function updatePage(result) {
    let n = result.length;
    let p = 1;
    let eachPage = 12;
    if (n >= eachPage) {
      p = Math.ceil(n / eachPage);
    }
    let pageCarts = [];
    for (var i = 0; i < p; i++) {
      let sliceTo = (i + 1) * eachPage < n ? (i + 1) * eachPage : n;
      pageCarts[i] = result.slice(i * eachPage, sliceTo);
      if ((i + 1) * eachPage > n) break;
    }
    setCarts(pageCarts);
    setCurrentCarts(pageCarts[0]);
    setCurrentPage(0);
  }

  function changeRange(data) {
    switch (data) {
      case "name":
        if (range == 1) {
          let sorted = response
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name));
          setRange(1);
          updatePage(sorted);
        }
        break;
      case "address":
        if (range == 1) {
          let sorted = response
            .slice()
            .sort((a, b) => a.address.localeCompare(b.address));
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response
            .slice()
            .sort((a, b) => b.address.localeCompare(a.address));
          setRange(1);
          updatePage(sorted);
        }
        break;
      case "date":
        if (range == 1) {
          let sorted = response
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date));
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));
          setRange(1);
          updatePage(sorted);
        }
        break;
      case "status":
        if (range == 1) {
          let sorted = response.slice().sort((a, b) => a.status - b.status);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => b.status - a.status);
          setRange(1);
          updatePage(sorted);
        }
    }
  }

  function changePage(index) {
    setCurrentPage(index);
    setCurrentCarts(carts[index]);
  }
  return (
    <div className="admin">
      <h1>ĐƠN HÀNG</h1>

      <div className="admin-products">
        <div className="admin-products-tools">
          <div className="admin-products-search">
            <input
              id="search_admin"
              type="text"
              placeholder="Tìm tên khách hàng"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <img src={icon_search} alt="search" />
          </div>
        </div>

        {carts.length > 0 ? (
          <div>
            <div className="admin-products-table">
              <table>
                <thead>
                  <tr>
                    <th>-</th>
                    <th onClick={() => changeRange("name")}>
                      TÊN
                      <img src={icon_sort} />
                    </th>
                    <th onClick={() => changeRange("address")}>
                      ĐỊA CHỈ
                      <img src={icon_sort} />
                    </th>
                    <th>PHONE</th>
                    <th onClick={() => changeRange("date")}>
                      NGÀY
                      <img src={icon_sort} />
                    </th>
                    <th>THANH TOÁN</th>
                    <th onClick={() => changeRange("status")}>
                      TÌNH TRẠNG
                      <img src={icon_sort} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCarts.map((p, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "highlight" : ""}
                      >
                        <td>
                          <p>
                            <Link
                              to={`/admin/orders/details/${p.id}`}
                              state={{ cart: p.id }}
                            >
                              <img src={icon_details} />
                            </Link>
                            <img
                              src={icon_delete}
                              onClick={() => removeOrder(p.id)}
                            />
                          </p>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.address}</td>
                        <td>{p.phone}</td>
                        <td>{p.date}</td>
                        <td>{p.bank ? "Ngân hàng" : "Tiền mặt"}</td>
                        <td>
                          <Select
                            options={statuses}
                            placeholder={showStatus(p.status)}
                            onChange={(e) => updateInfo(index, e)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="products-show-pages">
              {carts.map((page, index) => {
                return (
                  <div key={index}>
                    {index == currentPage ? (
                      <div
                        className="products-show-pages-current"
                        onClick={() => changePage(index)}
                      >
                        {index + 1}
                      </div>
                    ) : (
                      <div
                        className="products-show-pages-page"
                        onClick={() => changePage(index)}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="loading">
            <img src={loading} alt="loading" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
