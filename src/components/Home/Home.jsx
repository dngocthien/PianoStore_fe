import React from "react";
import { Products } from "./components/Products/Products";
import { useEffect, useState } from "react";

export const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        console.log(result);
      });
  }, []);
  return <div>Home</div>;
};
