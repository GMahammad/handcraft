import { Redirect, Route, Switch, useLocation } from "react-router-dom";
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
import AdminPage from "./Admin/AdminPage";
import MessagePage from "./Admin/Components/Messages/MessagePage";
import AdminNavbar from "./Admin/AdminNavbar";
import ProductManagementPage from "./Admin/Components/ProductsManagement/ProductManagementPage";
import CreateProduct from "./Admin/Components/ProductsManagement/CreateProduct";
import EditProduct from "./Admin/Components/ProductsManagement/EditProduct";
import UsersList from "./Admin/Components/AdminAuth/UsersList";
import ModsList from "./Admin/Components/AdminAuth/ModsList";
import AdminList from "./Admin/Components/AdminAuth/AdminList";
import UserManagement from "./Admin/Components/AdminAuth/UserManagement/UserManagement";
import { useSelector } from "react-redux";
import TodoPage from "./Admin/Components/AdminTodo/TodoPage";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("admin");
  const { isAdmin } = useSelector((store: any) => store.auth);
  return (
    <div className="d-flex flex-column min-vh-100 mt-5 pt-2">
      {!isAdminPage && <Navbar />}
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
            <AboutUs />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/detail:productId">
            <ProductDetailPage />
          </Route>
          <Route path="/cartpage">
            <CartPage />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/authentication/register">
            <AuthPage register={true} />
          </Route>
          <Route path="/authentication/login">
            <AuthPage register={false} />
          </Route>
          {isAdmin && (
            <>
              <Route path="/admin" exact>
                <AdminPage />
              </Route>
              <Route path="/messageadmin:messageId">
                <AdminNavbar />
                <MessagePage />
              </Route>
              <Route path="/admin/productmanage">
                <AdminNavbar />
                <ProductManagementPage />
              </Route>
              <Route path="/admin/createproduct">
                <AdminNavbar />
                <CreateProduct />
              </Route>
              <Route path="/admin/editproduct:productId">
                <AdminNavbar />
                <EditProduct />
              </Route>
              <Route path="/admin/userlist">
                <AdminNavbar />
                <UsersList />
              </Route>
              <Route path="/admin/modlist">
                <AdminNavbar />
                <ModsList />
              </Route>
              <Route path="/admin/adminlist">
                <AdminNavbar />
                <AdminList />
              </Route>
              <Route path="/admin/usermanagement">
                <AdminNavbar />
                <UserManagement />
              </Route>
              <Route path="/admin/todo">
                <AdminNavbar />
                <TodoPage />
              </Route>
            </>
          )}
        </Switch>
      </div>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
