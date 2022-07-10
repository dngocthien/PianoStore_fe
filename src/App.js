import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import NoPage from "./components/NoPage/NoPage";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import Thankyou from "./components/Payment/Thankyou";
import NavbarAdmin from "./components/Navbar/NavbarAdmin";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Admin/Admin";
import AdminProducts from "./components/Admin/AdminProducts/AdminProducts";
import AdminOrders from "./components/Admin/AdminOrders/AdminOrders";
import Details from "./components/Admin/Details/Details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:search" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart/:qr" element={<Cart />} />
          <Route path="cart/payment" element={<Payment />} />
          <Route path="thankyou" element={<Thankyou />} />
          <Route path="*" element={<NoPage />} />
          {/* <Route path="auth" element={<Auth />} /> */}
        </Route>
        <Route path="/admin" element={<NavbarAdmin />}>
          <Route index element={<Admin />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:search" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/details/:id" element={<Details />} />
        </Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// ReactDOM.render(<App />, document.getElementById("root"));
