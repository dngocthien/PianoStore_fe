import { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { Product } from "../Product/Product";
import "./Products.css";

const Products = () => {
  const [tag, setTag] = useState("PIANO");
  const [response, setResponse] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const brands = [
    { label: "Boston", value: "Boston" },
    { label: "Essex", value: "Essex" },
    { label: "Kawai", value: "Kawai" },
    { label: "Yamaha", value: "Yamaha" },
  ];
  const ranges = [
    { label: "Giá thấp đến cao", value: 1 },
    { label: "Giá cao đến thấp", value: 2 },
  ];

  const { search = "" } = useParams();
  if (search != searchQuery) {
    setSearchQuery(search);
    changeSearch(search);
  }

  useEffect(() => {
    fetch("http://localhost:8081/products/" + search)
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

  function changeSearch(qr) {
    fetch("http://localhost:8081/products/" + qr)
      .then((res) => res.json())
      .then((result) => {
        updatePage(result);
        setResponse(result);
      });
  }
  function changeBrand(brand) {
    fetch("http://localhost:8081/productByBrand/" + brand.value)
      .then((res) => res.json())
      .then((result) => {
        updatePage(result);
        setResponse(result);
      });
  }
  function changeRange(range) {
    if (range.value == 1) {
      let sorted = response.slice().sort((a, b) => a.price - b.price);
      updatePage(sorted);
    } else {
      let sorted = response.slice().sort((a, b) => a.price - b.price);
      let rev = [...sorted].reverse();
      updatePage(rev);
    }
  }

  function changePage(index) {
    setCurrentPage(index);
    setCurrentProducts(products[index]);
  }

  return (
    <div className="products">
      <h1>{tag}</h1>

      <div className="products-select">
        <Select
          options={brands}
          placeholder="Thuơng hiệu "
          onChange={(e) => changeBrand(e)}
        />
        <Select
          options={ranges}
          placeholder="Sắp xếp "
          onChange={(e) => changeRange(e)}
        />
      </div>

      <div>
        {currentProducts.length > 0 ? (
          <div>
            <div className="products-show">
              {currentProducts.map((p, index) => {
                return <Product key={index} product={p} />;
              })}
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
};

export default Products;
