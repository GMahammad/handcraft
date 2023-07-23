import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
    const handleLinkClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
      };
  return (
    <>
       <footer className="footer-area  pt-5">
            <div className="footer-top-area pt-120 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget mb-30">
                                <a href="#"><img  className="logo" src={require("../Assets/Images/logo.png")}/></a>
                                <div className="footer-about">
                                    <p>Handcraft is a Multipurpose Powerful Design for your eCommerce Business</p>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-7">
                            <div className="footer-widget mb-30">
                                <h3 className="footer-widget-title-4">Pages</h3>
                                <div className="footer-widget-content-4">
                                    <ul>
                                        <li><Link onClick={handleLinkClick} to='/' href="shop.html">Home Page</Link></li>
                                        <li><Link onClick={handleLinkClick} to='/search'>Search Products</Link></li>
                                        <li><Link onClick={handleLinkClick} to="/aboutus">About Us</Link></li>
                                        <li><Link onClick={handleLinkClick} to="/contact">Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5">
                            <div className="footer-widget mb-30">
                                <h3 className="footer-widget-title-4">Support</h3>
                                <div className="footer-widget-content-4">
                                    <ul>
                                        <li><a href="register.html">My Account</a></li>
                                        <li><a href="login.html">Login</a></li>
                                        <li><a href="register.html">Register</a></li>
                                        <li><a href="#">Privacy</a></li>
                                        <li><a href="#">Support</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom ptb-20 border-top-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="copyright-handicraft">
                                <p className='text-white'>Copyright ©MahammadGulalov 2022 . All Right Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer