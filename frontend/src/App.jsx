import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart/Cart.jsx";
import Layout from "./components/Layout/Layout.jsx";
import AuthModal from "./components/AuthModal/AuthModal.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";

import { useAuth } from "./context/AuthContext.jsx";

function AdminRoute() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        Checking access...
      </div>
    );
  }

  return isAdmin ? (
    <Admin />
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/admin"
            element={<AdminRoute />}
          />
        </Route>

        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>

      <AuthModal />
    </>
  );
}