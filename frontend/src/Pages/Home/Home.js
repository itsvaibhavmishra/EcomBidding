import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []); // [] cause we use useEffect only once

  return (
    <div className="home__component">
      <div className="text-center pb-4 pt-8">
        <h2 className="text-gray-600 inline-block border-b-2 w-4/12 border-solid border-lightgray text-4xl px-2 mx-auto">
          Listed Products
        </h2>
      </div>

      <div className="products flex flex-wrap justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div
              className="items border border-solid border-lightgray m-4"
              key={product.id}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  className="w-full"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="items__info p-4">
                <Link to={`/products/${product.id}`}>
                  <p>{product.name}</p>
                  <p className="text-sm">
                    <small>₹</small>
                    {product.price}
                  </p>
                </Link>
                <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mt-4">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
