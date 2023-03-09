import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Header />
              <SearchPage />
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
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
