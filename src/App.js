import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/cart/cart";
import Checkout from "./components/checkout/checkout";
import Login from "./components/customer/login/login";
import ProfilePage from "./components/customer/profile/profile";
import Register from "./components/customer/register/register";
import Add from "./components/food/add-food/add-food";
import Menu from "./components/food/menu/menu";
import Navbar from "./components/navbar/navbar";

function PrivateRoute({ userLoggedIn, children }) {
  return userLoggedIn ? children : <Navigate to="/customer/login" />;
}

function AppContent({ userLoggedIn }) {
  const location = useLocation();

  // Paths where the Navbar should be hidden
  const hideNavbarPaths = ["/customer/login", "/customer/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/customer/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/profile" element={<ProfilePage />} />
        <Route path="/food/add" element={<Add />} />
        <Route path="/food/menu" element={<Menu />} />
        <Route
          path="/"
          element={
            <PrivateRoute userLoggedIn={userLoggedIn}>
              <Menu />
            </PrivateRoute>
          }
        />
        <Route path="/cart/item" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode(token);
        setUserLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        toast.error("Invalid token. Please login again.");
        localStorage.removeItem("token");
        setUserLoggedIn(false);
      }
    }
  }, []);

  return (
    <Router>
      <AppContent userLoggedIn={userLoggedIn} />
    </Router>
  );
}

export default App;
