import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
import Footer from './Pages/Footer/Footer';
import CartPage from './Pages/CartPage/CartPage';
import ProductItems from './Pages/ProductItems/ProductItems';

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
      </Routes>
    </Router>
  );
}

export default App;
