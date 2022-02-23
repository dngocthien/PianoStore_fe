import { useEffect, useState } from "react";
import Select from "react-select";
import { Product } from "../Product/Product";
import "./Products.css";

const Products = () => {
  const [tag, setTag] = useState("PIANO");
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [page, setPage] = useState(1);
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

  // useEffect(() => {
  //   setProducts(result);
  //   console.log(result);
  // }, []);
  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);

        // let n = result.length;
        // let p = 1;
        // if (n > 15) {
        //   p = Math.floor(n / 15) + 1;
        //   setPage(p);
        // }
        // let pageProduct = [];
        // for (var i = 0; i < p; i++) {
        //   let sliceTo = i * 15 < n ? i * 15 : n;
        //   pageProduct[i] = result.slice(i, sliceTo);
        // }
        // setShowProducts(pageProduct);
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

      <div className="products-show-page"></div>
    </div>
  );
};

export default Products;
