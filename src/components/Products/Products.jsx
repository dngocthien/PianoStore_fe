import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Navbar } from "../Navbar/Navbar";
import { Product } from "../Product/Product";
import "./Products.css";

export const Products = () => {
  const [tag, setTag] = useState("PIANO");
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  function changeBrand(brand) {
    fetch("http://localhost:8081/productByBrand/" + brand.value)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }
  function changeRange(range) {
    if (range.value == 1) {
      let sorted = products.slice().sort((a, b) => a.price - b.price);
      setProducts(sorted);
    } else {
      let sorted = products.slice().sort((a, b) => a.price - b.price);
      let rev = [...sorted].reverse();
      setProducts(rev);
    }
  }

  return (
    <div>
      <Navbar />

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

        <div className="products-show">
          {products.map((p, index) => {
            return <Product key={index} product={p} />;
          })}
        </div>
      </div>
    </div>
  );
};
