import React from "react";
import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import logo from "../../assets/logo.png";
import icon_avatar from "../../assets/avatar.png";
import icon_notification from "../../assets/notification.png";
import icon_menu from "../../assets/menu.png";
import "./Navbar.css";

function NavbarAdmin() {
  const routes = [
    { path: "*", breadcrumb: null },
    { path: "/admin", breadcrumb: "Admin" },
    { path: "/admin/orders", breadcrumb: "Đơn hàng" },
    { path: "/admin/orders/details/:id", breadcrumb: "Chi tiết" },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="admin-nav">
      <div className="admin-navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="navbar-container">
          <div className="navbar-container-a">
            <Link to={"/admin"}>
              <img src={icon_notification} alt="cart" />
            </Link>
            <Link className="text-link" to="/admin">
              <img className="avatar" src={icon_avatar} alt="avatar" />
            </Link>
          </div>

          <div className="navbar-container-menu">
            {!showMenu ? (
              <img src={icon_menu} onClick={() => setShowMenu(true)} />
            ) : (
              <img src={icon_menu} onClick={() => setShowMenu(false)} />
            )}
          </div>
        </div>
      </div>
      <div className="admin-navbar-container">
        {showMenu && (
          <div className="admin-navbar-container-menu">
            <div>
              <Link
                className="text-link"
                to={"/admin/products"}
                onClick={() => setShowMenu(false)}
              >
                <h3>Products</h3>
              </Link>
            </div>
            <div>
              <Link
                className="text-link"
                to={"/admin/orders"}
                onClick={() => setShowMenu(false)}
              >
                <h3>Orders</h3>
              </Link>
            </div>
          </div>
        )}

        <div className="admin-navbar-container-left">
          <div>
            <Link className="text-link" to={"/admin/products"}>
              <h3>SẢN PHẨM</h3>
            </Link>
          </div>
          <div>
            <Link className="text-link" to={"/admin/orders"}>
              <h3>ĐƠN HÀNG</h3>
            </Link>
          </div>
        </div>

        <div className="admin-navbar-container-right">
          <div className="nav-breadcrumbs">
            {breadcrumbs.map(({ match, breadcrumb }) => (
              <span key={match.pathname}>
                <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                <span>&ensp;</span>
                <span>&#62;</span>
                <span>&ensp;</span>
              </span>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default NavbarAdmin;
