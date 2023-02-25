import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './Home.css';
import Product from '../../Components/Product/Product';
import { Helmet } from 'react-helmet-async';

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
        <Helmet>
          <title>EcomBidding</title>
        </Helmet>
        <h2 className="text-gray-600 inline-block border-b-2 w-4/12 border-solid border-lightgray text-4xl px-2 mx-auto">
          Listed Products
        </h2>
      </div>

      <div className="products flex flex-wrap justify-center">
        {loading ? (
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="relative">
                <div
                  className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-cyan-500"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
