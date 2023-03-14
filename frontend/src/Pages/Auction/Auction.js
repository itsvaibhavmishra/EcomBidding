import React, { useEffect, useReducer } from 'react';
import AuctionItem from '../../Components/AuctionItem/AuctionItem';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const initialState = {
  products: [],
  loading: true,
  error: '',
};

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

function AuctionPage() {
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('/api/auctions'); // replace with your API endpoint
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <header className="bg-cyan-500 py-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            <i className="fas fa-hourglass-half text-2xl mr-2"></i>
            Live Auction
          </h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <AuctionItem
                key={product.id}
                name={product.name}
                image={product.image}
                endTime={product.endTime}
                bidPrice={product.bidPrice}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-2">No auctions found!</h2>
            <p className="text-gray-500">
              Please check back later for more auctions.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AuctionPage;
