import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
      <nav className="nav-main navbar navbar-expand-lg navbar-dark main-color py-3" >
        <div className="container-fluid">
        <span className="navbar-brand"><img  className="logo" src={require("../Assets/Images/logo.png")}/></span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
                    <span className="navbar-toggler-icon">HandCraft</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-custom nav-link" >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-custom nav-link"  >
                Search Product
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
              <li className="nav-item m-1">
                <a
                href="#"
                  type="button"
                  className="btn btn-outline-light"
                >
                  Sign in
                </a>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar