import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
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
            </>
          }
        />

        <Route
          path="/products/:id"
          element={
            <>
              <Header />
              <ProductItems />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
