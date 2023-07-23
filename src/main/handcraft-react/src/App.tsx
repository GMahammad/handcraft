import { Redirect, Route,Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./Home/HomePage";
import Footer from "./NavbarFooter/Footer";
import Navbar from "./NavbarFooter/Navbar";
import ProductDetailPage from "./ProductDetail/ProductDetailPage";
import SearchProductPage from "./SearchProduct/SearchProductPage";
import AboutUs from "./AboutUs/AboutUs";
import ContactPage from "./Contact/ContactPage";
import CartPage from "./Cart/Components/CartPage";
import Checkout from "./Cart/Components/Checkout";
import AuthPage from "./Auth/AuthPage";




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
          <Route path="/cartpage">
          <CartPage/>
          </Route>
          <Route path="/checkout">
          <Checkout/>
          </Route>
          <Route path="/authentication/register">
          <AuthPage register={true}/>
          </Route>
          <Route path="/authentication/login">
          <AuthPage register = {false}/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
