import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "../Cart/CartContainer";
import { useState } from "react";
import { isAuthenticatedChecker, logout } from "../Auth/Data/authSlice";
const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { count } = useSelector((store: any) => store.cart);
  const { isAuthenticated,name } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  dispatch(isAuthenticatedChecker())
  return (
    <nav className="nav-main navbar navbar-expand-lg  navbar-dark main-color py-5">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <span className="navbar-brand">
              <img
                className="logo"
                src={require("../Assets/Images/logo.png")}
              />
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
              {isAuthenticated ? <div className="d-flex align-items-center"><span className="welcome">{`Welcome ${name}`} </span> <p className="logout " onClick={()=>dispatch(logout())}>Log Out</p></div>
            : <li className="nav-custom nav-link nav-item  d-flex">
            <Link className="nav-custom nav-link" to="/authentication/register">Register</Link>
          <Link className="nav-custom nav-link" to="/authentication/login">Login</Link>
          </li>

            }
             
              <li className="nav-item m-1 cart-button " >
                <button
                  onClick={() => setShowCart(!showCart)}
                  style={{ color: "black" }}
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
                {showCart ? <CartContainer /> : <></>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
