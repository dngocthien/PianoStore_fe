import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import logo from "../../assets/logo2.png";
import icon_search from "../../assets/search.png";
import icon_search2 from "../../assets/search2.png";
import icon_cart2 from "../../assets/cart2.png";
import icon_menu from "../../assets/menu2.png";
import icon_x from "../../assets/x.png";
import "./Navbar.css";
import Footer from "../Footer/Footer";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  function onSeach() {
    document.getElementById("searching1").value = "";
    document.getElementById("searching2").value = "";
    setSearchQuery("");
    navigate(`/products/${searchQuery}`);
  }

  return (
    <div className="nav">
      <div className="navbar">
        <div className="navbar-container-menu">
          {!showMenu ? (
            <img src={icon_menu} onClick={() => setShowMenu(true)} />
          ) : (
            <img src={icon_x} onClick={() => setShowMenu(false)} />
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
            <input
              id="searching1"
              type="text"
              placeholder="Tìm sản phẩm"
              onChange={() =>
                setSearchQuery(document.getElementById("searching1").value)
              }
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSeach();
                }
              }}
            />
            <img src={icon_search2} alt="search" onClick={() => onSeach()} />
          </div>

          <div className="navbar-container-cart">
            <Link to={"/cart"}>
              <img src={icon_cart2} alt="cart" />
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar-container-search search2">
        <input
          id="searching2"
          type="text"
          placeholder="Tìm sản phẩm"
          onChange={() =>
            setSearchQuery(document.getElementById("searching2").value)
          }
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSeach();
            }
          }}
        />
        <img src={icon_search} alt="search" onClick={() => onSeach()} />
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
