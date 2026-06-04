import React, {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  Menu,
  X,
  ShoppingBag,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

import "./Layout.css";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const {
    isLoggedIn,
    isAdmin,
    openAuth,
    signOut,
  } = useAuth();

  const { count } = useCart();

  useEffect(() => {
    document.documentElement.dataset.theme = dark
      ? "dark"
      : "light";

    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const askLogout = () => {
    setMenuOpen(false);

    setShowLogoutConfirm(true);
  };

  const askLogin = () => {
    setMenuOpen(false);

    openAuth("login");
  };

  async function handleLogout() {
    await signOut();

    setShowLogoutConfirm(false);
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <NavLink
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            DW
          </span>

          <span>
            <strong>DRIPOVA WEARS</strong>

            <small>
              Buy & Sell Premium Fashion
            </small>
          </span>
        </NavLink>

        <nav
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <NavLink
            onClick={closeMenu}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            onClick={closeMenu}
            to="/shop"
          >
            Shop
          </NavLink>

          <NavLink
            onClick={closeMenu}
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            onClick={closeMenu}
            to="/contact"
          >
            Contact
          </NavLink>

          {isAdmin && (
            <NavLink
              onClick={closeMenu}
              to="/admin"
              className="admin-link"
            >
              <ShieldCheck size={17} />
              Admin
            </NavLink>
          )}

           <button
            type="button"
            className="nav-menu-action"
            onClick={() =>
              setDark((value) => !value)
            }
          >
            {dark ? "Light" : "Dark"}
          </button>

          {isLoggedIn && (
            <button
              type="button"
              className="nav-menu-action logout-menu-btn"
              onClick={askLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          )}

         

          {!isLoggedIn && (
            <button
              type="button"
              className="nav-menu-action"
              onClick={askLogin}
            >
              Login
            </button>
          )}
        </nav>

        <div className="nav-actions">
          <NavLink
            to="/cart"
            className="icon-btn cart-btn"
            title="Cart"
          >
            <ShoppingBag size={20} />

            <span>{count}</span>
          </NavLink>

          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={closeMenu}
        />
      )}

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div>
          <strong>DRIPOVA WEARS</strong>

          <p>
            Premium clothing marketplace built for
            modern buyers and sellers.
          </p>
        </div>

        <p>
          © 2026 DRIPOVA WEARS. All rights reserved.
        </p>
      </footer>

      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="logout-card">
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setShowLogoutConfirm(false)
              }
            >
              <X size={20} />
            </button>

            <div className="auth-icon">
              <LogOut />
            </div>

            <h2>
              Are you sure you want to log out?
            </h2>

            <p>
              You will need to login again before
              adding clothes to your cart or
              accessing your account.
            </p>

            <div className="logout-actions">
              <button
                type="button"
                className="ghost-btn"
                onClick={() =>
                  setShowLogoutConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-btn"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
