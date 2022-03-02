import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import icon_delete from "../../../assets/delete.png";
import icon_edit from "../../../assets/edit.png";
import icon_search from "../../../assets/search.png";
import icon_sort from "../../../assets/sort.png";
import "./AdminProducts.css";

function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [range, setRange] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditroduct] = useState(false);
  const [existingName, setExistingName] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [remain, setRemain] = useState(0);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/products/" + searchQuery)
      .then((res) => res.json())
      .then((result) => {
        setResponse(result);
        updatePage(result);
      });
  }, [searchQuery]);

  function updatePage(result) {
    let n = result.length;
    let p = 1;
    let eachPage = 12;
    if (n > eachPage) {
      p = Math.ceil(n / eachPage);
    }
    let pageProduct = [];
    for (var i = 0; i <= p; i++) {
      let sliceTo = (i + 1) * eachPage < n ? (i + 1) * eachPage : n;
      pageProduct[i] = result.slice(i * eachPage, sliceTo);
      if ((i + 1) * eachPage > n) break;
    }
    setProducts(pageProduct);
    setCurrentProducts(pageProduct[0]);
    setCurrentPage(0);
  }

  function changeRange(data) {
    switch (data) {
      case "name":
        if (range == 1) {
          let sorted = response.slice().sort((a, b) => a.name - b.name);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => a.name - b.name);
          let rev = [...sorted].reverse();
          setRange(1);
          updatePage(rev);
        }
        break;
      case "brand":
        if (range == 1) {
          let sorted = response.slice().sort((a, b) => a.brand - b.brand);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => a.brand - b.brand);
          let rev = [...sorted].reverse();
          setRange(1);
          updatePage(rev);
        }
        break;
      case "price":
        if (range == 1) {
          let sorted = response.slice().sort((a, b) => a.price - b.price);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => a.price - b.price);
          let rev = [...sorted].reverse();
          setRange(1);
          updatePage(rev);
        }
        break;
      case "remain":
        if (range == 1) {
          let sorted = response.slice().sort((a, b) => a.remain - b.remain);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => a.remain - b.remain);
          let rev = [...sorted].reverse();
          setRange(1);
          updatePage(rev);
        }
        break;
    }
  }

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    setImageData(imageData);
  };

  function saveProduct() {
    const product = { name, brand, price, remain };
    fetch("http://localhost:8081/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }).then(() => {
      fetch("http://localhost:8081/products")
        .then((res) => res.json())
        .then((result) => {
          setResponse(result);
          setShowAddProduct(false);
          updatePage(result);
        });
    });
  }

  function editProduct(p) {
    setShowEditroduct(true);
    setShowAddProduct(false);
    setExistingName(p.name);
    setName(p.name);
    setBrand(p.brand);
    setPrice(p.price);
    setRemain(p.remain);
  }

  function updateProduct() {
    const product = { name, brand, price, remain };
    (fetch("http://localhost:8081/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }),
    fetch("http://localhost:8081/delete/" + existingName, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingName),
    })).then(() => {
      fetch("http://localhost:8081/products")
        .then((res) => res.json())
        .then((result) => {
          setResponse(result);
          setShowEditroduct(false);
          updatePage(result);
        });
    });
  }

  function removeProducts(name) {
    fetch("http://localhost:8081/delete/" + name, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name),
    }).then(() => {
      fetch("http://localhost:8081/products")
        .then((res) => res.json())
        .then((result) => {
          setResponse(result);
          updatePage(result);
        });
    });
  }

  function switchAddProduct() {
    if (showAddProduct == true) {
      setShowAddProduct(false);
    } else {
      setShowAddProduct(true);
      setShowEditroduct(false);
    }
  }

  function changePage(index) {
    setCurrentPage(index);
    setCurrentProducts(products[index]);
  }

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(",");
  }
  return (
    <div className="admin">
      <h1>SẢN PHẨM</h1>

      <div className="admin-products">
        <div className="admin-products-tools">
          <div className="admin-products-search">
            <input
              id="search_admin"
              type="text"
              placeholder="Tìm sản phẩm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <img src={icon_search} alt="search" />
          </div>

          <button onClick={() => switchAddProduct()}>THÊM</button>
          {showAddProduct && (
            <div className="admin-products-add">
              <h3>THÊM SẢN PHẨM</h3>
              <p>
                <input
                  id="add_name"
                  placeholder="Tên sản phẩm"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </p>
              <p>
                <input
                  id="add_brand"
                  placeholder="Thương hiệu"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </p>
              <p>
                <input
                  id="add_price"
                  placeholder="Giá"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </p>
              <p>
                <input
                  id="add_price"
                  placeholder="Số lượng"
                  onChange={(e) => setRemain(e.target.value)}
                ></input>
              </p>

              {/* <input
                accept="image/*"
                id="add_image"
                type="file"
                onChange={handleUploadClick}
              /> */}

              <div className="admin-products-add-footer">
                <div className="admin-products-add-footer-cancel">
                  <button onClick={() => setShowAddProduct(false)}>HUỶ</button>
                </div>

                <button
                  onClick={(event) => {
                    event.preventDefault();
                    saveProduct();
                  }}
                >
                  LƯU
                </button>
              </div>
            </div>
          )}

          {showEditProduct && (
            <div className="admin-products-add">
              <h3>CẬP NHẬT SẢN PHẨM</h3>
              <p>
                <input
                  value={name}
                  placeholder="Tên sản phẩm"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </p>
              <p>
                <input
                  value={brand}
                  placeholder="Thương hiệu"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </p>
              <p>
                <input
                  value={price}
                  placeholder="Giá"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </p>
              <p>
                <input
                  value={remain}
                  placeholder="Số lượng"
                  onChange={(e) => setRemain(e.target.value)}
                ></input>
              </p>

              <div className="admin-products-add-footer">
                <div className="admin-products-add-footer-cancel">
                  <button onClick={() => setShowEditroduct(false)}>HUỶ</button>
                </div>

                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updateProduct();
                  }}
                >
                  LƯU
                </button>
              </div>
            </div>
          )}
        </div>

        {currentProducts.length > 0 ? (
          <div>
            <div className="admin-products-table">
              <table>
                <thead>
                  <tr>
                    <th>-</th>
                    <th onClick={() => changeRange("name")}>
                      SẢN PHẨM
                      <img src={icon_sort} />
                    </th>
                    <th onClick={() => changeRange("brand")}>
                      THƯƠNG HIỆU
                      <img src={icon_sort} />
                    </th>
                    <th onClick={() => changeRange("price")}>
                      GIÁ
                      <img src={icon_sort} />
                    </th>
                    <th onClick={() => changeRange("remain")}>
                      CÒN LẠI
                      <img src={icon_sort} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((p, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "highlight" : ""}
                      >
                        <td>
                          <p>
                            <img
                              src={icon_delete}
                              onClick={() => removeProducts(p.name)}
                            />
                            <img
                              src={icon_edit}
                              onClick={() => editProduct(p)}
                            />
                          </p>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.brand}</td>
                        <td>{numberWithCommas(p.price)}</td>
                        <td>{p.remain}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="products-show-pages">
              {products.map((page, index) => {
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
          <div className="products-null">
            <p>Không tồn tại sản phẩm.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
