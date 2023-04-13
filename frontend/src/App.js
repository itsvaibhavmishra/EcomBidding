import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
import Footer from './Pages/Footer/Footer';
import ProductItems from './Pages/ProductItems/ProductItems';
import LoginPage from './Pages/SignIn/SignIn';
import RegisterPage from './Pages/SignUp/SignUp';
import CartPage from './Pages/CartPage/CartPage';
import OrderPage from './Pages/OrderPage/OrderPage';
import AddressPage from './Pages/AddressPage/AddressPage';
import PaymentMethod from './Pages/PaymentMethod/PaymentMethod';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SearchPage from './Pages/SearchPage/SearchPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import AdminRoute from './Components/AdminRoute/AdminRoute';
import ProductListPage from './Pages/ProductListPage/ProductListPage';
import ProductEditPage from './Pages/ProductEditPage/ProductEditPage';
import OrderListPage from './Pages/OrderListPage/OrderListPage';
import UserListPage from './Pages/UserListPage/UserListPage';
import UserEditPage from './Pages/UserEditPage/UserEditPage';
import SellerRoute from './Components/SellerRoute/SellerRoute';
import Auction from './Pages/Auction/Auction';
import CreateAuction from './Pages/CreateAuction/CreateAuction';
import AuctionDetail from './Pages/AuctionDetails/AuctionDetail';

// Set the base URL for all axios requests
axios.defaults.baseURL =
  process.env.REACT_APP_API_PROXY || 'http://localhost:5000';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/products/:url"
          element={
            <>
              <Header />
              <ProductItems />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <CartPage />
            </>
          }
        />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        <Route
          path="/shipping"
          element={
            <>
              <Header />
              <AddressPage />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <PaymentMethod />
            </>
          }
        />

        <Route
          path="/placeorder"
          element={
            <>
              <Header />
              <PlaceOrder />
            </>
          }
        />

        <Route
          path="/order/:id"
          element={
            <>
              <Header />
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/orderhistory"
          element={
            <>
              <Header />
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Header />
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Header />
              <SearchPage />
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <>
              <Header />
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/products"
          element={
            <>
              <Header />
              <AdminRoute>
                <ProductListPage />
              </AdminRoute>
              <Footer />
            </>
          }
          exact
        />

        <Route
          path="/admin/product/:id"
          element={
            <>
              <Header />
              <AdminRoute>
                <ProductEditPage />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <>
              <Header />
              <AdminRoute>
                <OrderListPage />
              </AdminRoute>
            </>
          }
          exact
        />

        <Route
          path="/admin/users"
          element={
            <>
              <Header />
              <AdminRoute>
                <UserListPage />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <>
              <Header />
              <AdminRoute>
                <UserEditPage />
              </AdminRoute>
              <Footer />
            </>
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller/products"
          element={
            <>
              <Header />
              <SellerRoute>
                <ProductListPage />
              </SellerRoute>
            </>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <>
              <Header />
              <SellerRoute>
                <OrderListPage />
              </SellerRoute>
            </>
          }
        />

        <Route
          path="/auction"
          element={
            <>
              <Header />
              <Auction />
            </>
          }
        />

        <Route
          path="/create-auction"
          element={
            <>
              <Header />
              <CreateAuction />
            </>
          }
        />

        <Route
          path="/auctions/:id"
          element={
            <>
              <Header />
              <AuctionDetail />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
