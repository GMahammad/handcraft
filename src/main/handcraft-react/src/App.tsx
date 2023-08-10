import {
  Redirect,
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
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
import HomePageManagement from "./Admin/Components/HomePageManagement/HomePageManagement";
import PaymentCompleted from "./Cart/Components/PaymentCompleted";
import Login from "./Auth/Components/Login";
import PaymentPage from "./Admin/Components/Payments/PaymentPage";
import SinglePayment from "./Admin/Components/Payments/SinglePayment";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("admin");
  const { isAdmin, isAuthenticated, isMod } = useSelector(
    (store: any) => store.auth
  );

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
          <Route path="/authentication/register">
            <AuthPage register={true} />
          </Route>
          <Route path="/authentication/login">
            <AuthPage register={false} />
          </Route>

          {isAdmin && (
            <Route path="/admin/usermanagement">
              <AdminNavbar />
              <UserManagement />
            </Route>
          )}
          {(isAdmin || isMod) && (
            <Switch>
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
              <Route path="/admin/homepagemanage">
                <AdminNavbar />
                <HomePageManagement />
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

              <Route path="/admin/todo">
                <AdminNavbar />
                <TodoPage />
              </Route>
              <Route path="/admin/payments">
                <AdminNavbar />
                <PaymentPage />
              </Route>
              <Route path="/admin/payments:checkoutId">
                <AdminNavbar />
                <SinglePayment />
              </Route>
              <Route path="/cartpage" component={CartPage} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/paymentcompleted" component={PaymentCompleted} />
            </Switch>
          )}
          {isAuthenticated ? (
            <Switch>
              <Route path="/cartpage" component={CartPage} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/paymentcompleted" component={PaymentCompleted} />
              <Redirect to="/cartpage" />
            </Switch>
          ) : (
            <Redirect to="/authentication/login" />
          )}
        </Switch>
      </div>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
