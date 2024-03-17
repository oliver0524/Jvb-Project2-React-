import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext";   // Import DarkModeContext

export function Navbar() {
  const contextValue = useContext(DarkModeContext);    // Get the context value from DarkModeContext

  return (
    <nav className="navbar">
      {/* Navbar content */}
      <ul>
        <li className="navbar-item">
          <Link
            to=""
            style={{
              color: contextValue?.isDarkMode ? "white" : "black",   // Set link color based on dark mode
            }}
          >
            Landing Page
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/products"
            style={{
              color: contextValue?.isDarkMode ? "white" : "black",   // Set link color based on dark mode
            }}
          >
            Product Page
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/seller"
            style={{
              color: contextValue?.isDarkMode ? "white" : "black",    // Set link color based on dark mode
            }}
          >
            Seller Page
          </Link>
        </li>
      </ul>
    </nav>
  );
}
