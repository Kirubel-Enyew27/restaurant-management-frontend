import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./components/cart/cart";
import Checkout from "./components/checkout/checkout";
import Login from "./components/customer/login/login";
import ProfilePage from "./components/customer/profile/profile";
import Register from "./components/customer/register/register";
import Add from "./components/food/add-food/add-food";
import Menu from "./components/food/menu/menu";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/customer/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/profile" element={<ProfilePage />} />
        <Route path="/food/add" element={<Add />} />
        <Route path="/food/menu" element={<Menu />} />
        <Route path="/cart/item" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
