import { useEffect, useState } from "react";
import { Product } from "../Product/Product";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);
  return (
    <div className="home">
      <div className="home-piano">
        <h1>PIANO</h1>
        <div className="products-model">
          {products.slice(0, 4).map((p, index) => {
            return <Product key={index} product={p} />;
          })}
        </div>
      </div>

      <div className="home-blog">
        <h1>BLOG</h1>
        <p>Hiện chưa có bài viết nào.</p>
      </div>
    </div>
  );
};

export default Home;
