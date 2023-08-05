import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "../Cart/CartContainer";
import { useState } from "react";
import {
  isAdminChecker,
  isAuthenticatedChecker,
  logout,
} from "../Auth/Data/authSlice";
const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { count } = useSelector((store: any) => store.cart);
  const { isAuthenticated, name, isAdmin } = useSelector(
    (store: any) => store.auth
  );
  const dispatch = useDispatch();
  dispatch(isAuthenticatedChecker());
  dispatch(isAdminChecker());
  return (
    <nav className="navbar navbar-main navbar-expand-lg  main-color px-1 p-0">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            className="logo"
            src={require("../Assets/Images/logo.png")}
            alt="Logo"
          />
        </NavLink>
        <div className="d-flex">
          <div className="cart-button col-md col-sm d-lg-none">
            <button
              onClick={() => setShowCart(!showCart)}
              style={{ color: "black" }}
              className="nav-custom nav-link"
            >
              Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-basket mb-2 mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
              </svg>{" "}
              <label className="cart-count">{count}</label>
            </button>
          </div>
          {showCart && <CartContainer />}
        <button
          className="navbar-toggler mx-1"
          type="button"
          
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
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
            {isAdmin && (
              <li className="nav-item">
                <NavLink to="/admin" className="nav-custom nav-link">
                  Admin
                </NavLink>
              </li>
            )}
            {isAuthenticated ? (
              <li className="nav-item">
                <div className="nav-link">
                  <span className="welcome">{`Welcome ${name}`} </span>{" "}
                  <Link
                    to="/"
                    className="logout"
                    onClick={() => dispatch(logout())}
                  >
                    Log Out
                  </Link>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <div className="nav-link d-flex ">
                  <Link
                    className="nav-custom nav-link mx-1"
                    to="/authentication/register"
                  >
                    Register
                  </Link>
                  <Link
                    className="nav-custom nav-link mx-1"
                    to="/authentication/login"
                  >
                    Login
                  </Link>
                </div>
              </li>
            )}
            <li className="cart-button col-md col-sm d-md-none d-none d-lg-block">
            <button
              onClick={() => setShowCart(!showCart)}
              style={{ color: "black" }}
              className="nav-custom nav-link"
            >
              Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-basket mb-2 mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
              </svg>{" "}
              <label className="cart-count">{count}</label>
            </button>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
