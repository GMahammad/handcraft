import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-main navbar navbar-expand-lg navbar-dark main-color my-3">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
          <span className="navbar-brand">
            <img className="logo" src={require("../Assets/Images/logo.png")} />
          </span>
          </div>
          <div className=" text-center" id="navbarNavDropdown">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-custom nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/search" className="nav-custom nav-link">
                  Search Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/aboutus" className="nav-custom nav-link">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-custom nav-link">
                  Contact
                </NavLink>
              </li>
            </ul>
            
          </div>
          <div>
          <ul className="navbar-nav ms-auto">
              <li className="nav-item m-1">
                <a href="#" type="button" className="btn btn-outline-light">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
