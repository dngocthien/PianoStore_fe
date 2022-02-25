import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import NoPage from "./components/NoPage/NoPage";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./components/Blog/Blog";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:search" element={<Products />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart/" element={<Cart />} />
          <Route path="cart/:qr" element={<Cart />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// ReactDOM.render(<App />, document.getElementById("root"));
