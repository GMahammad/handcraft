import { Redirect, Route,Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./Home/HomePage";
import Footer from "./NavbarFooter/Footer";
import Navbar from "./NavbarFooter/Navbar";
import ProductDetailPage from "./ProductDetail/ProductDetailPage";
import SearchProductPage from "./SearchProduct/SearchProductPage";
import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import ContactPage from "./Contact/ContactPage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
          <Redirect to="/" />
            <HomePage />
          </Route>
          <Route path="/search">
          <SearchProductPage />
          </Route>
          <Route path="/aboutus">
          <AboutUs/>
          </Route>
          <Route path="/contact">
          <ContactPage/>
          </Route>
          <Route path="/detail:productId">
          <ProductDetailPage/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
