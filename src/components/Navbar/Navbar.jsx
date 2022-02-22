import React, { useState } from "react";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import cart from "../../assets/cart.png";
import menu from "../../assets/menu.png";
import x from "../../assets/x.png";
import "./Navbar.css";
import { Products } from "../Products/Products";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  function findProduct1() {
    let name = document.getElementById("searching1").value;
    document.getElementById("searching1").value = "";
    fetch("http://localhost:8081/productByName/" + name)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // setProducts(result);
        // return <Products result={result} />;
      });
  }
  function findProduct2() {
    let name = document.getElementById("searching2").value;
    document.getElementById("searching2").value = "";
    fetch("http://localhost:8081/productByName/" + name)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // setProducts(result);
        return <Products />;
      });
  }

  return (
    <div className="navbar">
      <div className="nav">
        <div className="navbar-container-menu">
          {!showMenu ? (
            <img src={menu} onClick={() => setShowMenu(true)} />
          ) : (
            <img src={x} onClick={() => setShowMenu(false)} />
          )}
          {showMenu && (
            <div className="navbar-container-menu-show">
              <p>
                <a>PIANO</a>
              </p>
              <p>
                <a>ORGAN</a>
              </p>
              <p>
                <a>GUITAR</a>
              </p>
            </div>
          )}
        </div>

        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="navbar-container">
          <div className="navbar-container-a">
            <p>
              <a>PIANO</a>
            </p>
            <p>
              <a>ORGAN</a>
            </p>
            <p>
              <a>GUITAR</a>
            </p>
          </div>

          <div className="navbar-container-search search1">
            <input id="searching1" type="text" placeholder="Tìm sản phẩm" />
            <img src={search} alt="search" onClick={() => findProduct1()} />
          </div>

          <div className="navbar-container-cart">
            <img src={cart} alt="cart" />
          </div>
        </div>
      </div>

      <div className="navbar-container-search search2">
        <input id="searching2" type="text" placeholder="Tìm sản phẩm" />
        <img src={search} alt="search" onClick={() => findProduct2()} />
      </div>
    </div>
  );
};
