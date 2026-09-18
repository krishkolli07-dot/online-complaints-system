import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <span className="brand-icon">✓</span>
          <span>ComplaintCare</span>
        </Link>

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

        <div
          className={`navbar-links ${
            menuOpen ? "active" : ""
          }`}
        >

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/register"
                onClick={closeMenu}
              >
                Register
              </Link>

              <Link
                to="/login"
                className="nav-login"
                onClick={closeMenu}
              >
                Login
              </Link>
            </>
          )}

          {user &&
            user.role === "user" && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <Link
                  to="/submit-complaint"
                  onClick={closeMenu}
                >
                  Submit Complaint
                </Link>

                <Link
                  to="/my-complaints"
                  onClick={closeMenu}
                >
                  My Complaints
                </Link>
              </>
            )}

          {user &&
            user.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>
            )}

          {user && (
            <div className="user-menu">

              <span className="user-name">
                👤 {user.name}
              </span>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;