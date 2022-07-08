import { useState, useEffect } from "react";
import icon_delete from "../../../assets/delete.png";
import icon_edit from "../../../assets/edit.png";
import icon_search from "../../../assets/search.png";
import icon_sort from "../../../assets/sort.png";
import icon_preview from "../../../assets/nopreview.png";
import loading from "../../../assets/loading.gif";
import "./AdminProducts.css";
import { DB_URL } from "../../../constants";

function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [range, setRange] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditroduct] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [remain, setRemain] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetch(DB_URL + "products/" + searchQuery)
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
        if (range === 1) {
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
      case "brand":
        if (range === 1) {
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
      case "price":
        if (range === 1) {
          let sorted = response.slice().sort((a, b) => a.price - b.price);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => b.price - a.price);
          setRange(1);
          updatePage(sorted);
        }
        break;
      case "remain":
        if (range == 1) {
          let sorted = response.slice().sort((a, b) => a.remain - b.remain);
          setRange(0);
          updatePage(sorted);
        } else {
          let sorted = response.slice().sort((a, b) => b.remain - a.remain);
          setRange(1);
          updatePage(sorted);
        }
        break;
    }
  }

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  async function saveProduct() {
    if (name !== "") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("remain", remain);
      formData.append("file", image);
      fetch(DB_URL + "addProduct", {
        method: "post",
        body: formData,
      }).then(() => {
        fetch(DB_URL + "products")
          .then((res) => res.json())
          .then((result) => {
            setResponse(result);
            setShowAddProduct(false);
            setShowEditroduct(false);
            updatePage(result);
          });
      });
    }
  }

  async function updateProduct() {
    if (name !== "") {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("remain", remain);
      formData.append("file", image);
      fetch(DB_URL + "updateProduct", {
        method: "post",
        body: formData,
      }).then(() => {
        fetch(DB_URL + "products")
          .then((res) => res.json())
          .then((result) => {
            setResponse(result);
            setShowAddProduct(false);
            setShowEditroduct(false);
            updatePage(result);
          });
      });
    }
  }

  function switchEditProduct(p) {
    setShowEditroduct(true);
    setShowAddProduct(false);
    setId(p.id);
    setName(p.name);
    setBrand(p.brand);
    setPrice(p.price);
    setRemain(p.remain);
    setImage(p.image);
    setImagePreview(p.image);
  }

  function removeProducts(name) {
    fetch(DB_URL + "delete/" + name, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name),
    }).then(() => {
      fetch(DB_URL + "products")
        .then((res) => res.json())
        .then((result) => {
          setResponse(result);
          updatePage(result);
        });
    });
  }

  function switchAddProduct() {
    if (showAddProduct === true) {
      setShowAddProduct(false);
    } else {
      setShowAddProduct(true);
      setShowEditroduct(false);
      setName("");
      setBrand("");
      setPrice(0);
      setRemain(true);
      setImage(null);
      setImagePreview(null);
    }
  }

  function changeRemainStatus() {
    if (remain) {
      setRemain(false);
    } else {
      setRemain(true);
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
              <div className="admin-products-add-body">
                <div className="admin-products-add-body-info">
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
                    <button onClick={() => changeRemainStatus()}>
                      {remain ? "Còn hàng" : "Hết hàng"}
                    </button>
                  </p>
                  <input
                    accept="image/*"
                    id="add_image"
                    type="file"
                    onChange={(e) => handleUploadClick(e)}
                  />
                </div>

                <div className="admin-products-add-body-img">
                  <img
                    src={imagePreview !== null ? imagePreview : icon_preview}
                  ></img>
                </div>
              </div>

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
              <div className="admin-products-add-body">
                <div className="admin-products-add-body-info">
                  <p>
                    <input
                      value={name}
                      placeholder="Thương hiệu"
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
                    <button onClick={() => changeRemainStatus()}>
                      {remain ? "Còn hàng" : "Hết hàng"}
                    </button>
                  </p>
                  <input
                    accept="image/*"
                    id="edit_image"
                    type="file"
                    onChange={(e) => handleUploadClick(e)}
                  />
                </div>

                <div className="admin-products-add-body-img">
                  <img src={imagePreview !== null ? imagePreview : image}></img>
                </div>
              </div>

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
                      TÌNH TRẠNG
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
                              onClick={() => switchEditProduct(p)}
                            />
                          </p>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.brand}</td>
                        <td>{numberWithCommas(p.price)}</td>
                        <td>{p.remain ? "Còn hàng" : "Hết hàng"}</td>
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
                    {index === currentPage ? (
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

export default AdminProducts;
