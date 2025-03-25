import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if admin

  return (
     <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000, // Ensures navbar stays above other elements
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Great is the Lord's Faithfulness Church
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {/*<li className="nav-item">
              <NavLink className="nav-link" to="/events">
                Upcoming Events
              </NavLink>
            </li>*/}
            <li className="nav-item">
              <NavLink className="nav-link" to="/team">
                Our Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/programs">
                Our Programs
              </NavLink>
            </li>

            {/* Show Admin only if logged in as admin */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}

            {/* Show Login only if NOT logged in */}
            {!token ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("isAdmin");
                    window.location.reload(); // Refresh page after logout
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
