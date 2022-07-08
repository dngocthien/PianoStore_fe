import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../Product/Product";
import Slider from "react-slick";

import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import loading from "../../assets/loading.gif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { DB_URL } from "../../constants";

const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [products, setProducts] = useState([]);
  const [cheapProducts, setCheapProducts] = useState([]);
  useEffect(() => {
    fetch(DB_URL + "products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });

    fetch(DB_URL + "products/cheap")
      .then((res) => res.json())
      .then((result) => {
        setCheapProducts(result);
      });
  }, []);
  return (
    <div className="home">
      <div className="home-slider">
        <Slider {...settings}>
          <div className="slider">
            <img src={slider1} />
          </div>
          <div className="slider">
            <img src={slider2} />
          </div>
          <div className="slider">
            <img src={slider3} />
          </div>
        </Slider>
      </div>

      <div className="home-container">
        <div className="home-container-piano">
          <h1>
            <Link className="text-link" to={"/products"}>
              PIANO
            </Link>
          </h1>
          {products.length > 0 ? (
            <Slider {...settings2}>
              {products.slice(0, 8).map((p, index) => {
                return <Product key={index} product={p} />;
              })}
            </Slider>
          ) : (
            <img className="loading" src={loading} alt="loading" />
          )}

          <br />
          <br />
          <br />

          <h1>PIANO GIÁ RẺ</h1>
          {cheapProducts.length > 0 ? (
            <Slider {...settings2}>
              {cheapProducts.slice(0, 8).map((p, index) => {
                return <Product key={index} product={p} />;
              })}
            </Slider>
          ) : (
            <img className="loading" src={loading} alt="loading" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
