import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/logo2.png";
import search from "../../assets/search.png";
import search2 from "../../assets/search2.png";
import cart2 from "../../assets/cart2.png";
import menu from "../../assets/menu2.png";
import x from "../../assets/x.png";
import "./Navbar.css";
import Footer from "../Footer/Footer";

const Navbar = () => {
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
        // return <Products />;
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
                <Link
                  className="text-link"
                  to="/products"
                  onClick={() => setShowMenu(false)}
                >
                  PIANO
                </Link>
              </p>
              <p>
                <Link
                  className="text-link"
                  to="/blog"
                  onClick={() => setShowMenu(false)}
                >
                  BLOG
                </Link>
              </p>
              <p>
                <Link
                  className="text-link"
                  to="/contact"
                  onClick={() => setShowMenu(false)}
                >
                  LIÊN HỆ
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="navbar-container">
          <div className="navbar-container-a">
            <p>
              <Link className="text-link" to="/products">
                PIANO
              </Link>
            </p>
            <p>
              <Link className="text-link" to="/blog">
                BLOG
              </Link>
            </p>
            <p>
              <Link className="text-link" to="/contact">
                LIÊN HỆ
              </Link>
            </p>
          </div>

          <div className="navbar-container-search search1">
            <input id="searching1" type="text" placeholder="Tìm sản phẩm" />
            <img src={search2} alt="search" onClick={() => findProduct1()} />
          </div>

          <div className="navbar-container-cart">
            <img src={cart2} alt="cart" />
          </div>
        </div>
      </div>

      <div className="navbar-container-search search2">
        <input id="searching2" type="text" placeholder="Tìm sản phẩm" />
        <img src={search} alt="search" onClick={() => findProduct2()} />
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
