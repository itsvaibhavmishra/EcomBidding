import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../../Components/Rating/Rating';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductItems() {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/id/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, [id]);

  return loading ? (
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
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 md:pr-8">
        <div class="max-w-7xl mx-auto">
          <img
            class="max-h-[40em] mb-4 md:mb-0 max-w-full m-2"
            src={product.image}
            alt={product.name}
          ></img>
        </div>
      </div>

      <div class="w-full md:w-1/2">
        <div class="p-4">
          <Helmet>
            <title>{product.name}-EcomBidding</title>
          </Helmet>
          <h1 class="text-2xl font-bold mb-2">{product.name}</h1>
          <div class="grid grid-cols-4 items-center mb-2">
            <div class="text-left">
              <Rating rating={product.rating} reviews={product.reviews} />
            </div>
          </div>
          <p class="text-lg mb-2">
            Price: <small>₹</small>
            {product.price}
          </p>
          <p class="text-lg mb-2">Description: {product.description}</p>
        </div>
        <div class="p-4">
          <ul class="divide-y divide-gray-200">
            <li class="py-2 flex justify-between items-center">
              <span>Price:</span>
              <span class="font-bold">
                <small>₹</small>
                {product.price}
              </span>
            </li>
            <li class="py-2 flex justify-between items-center">
              <span>Status:</span>
              <span>
                {product.stock > 0 ? (
                  <span class="bg-green-500 text-white py-1 px-2 rounded">
                    In Stock
                  </span>
                ) : (
                  <span class="bg-red-500 text-white py-1 px-2 rounded">
                    Unavailable
                  </span>
                )}
              </span>
            </li>
            {product.stock > 0 && (
              <li class="py-2">
                <div class="flex justify-center">
                  <button class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded w-auto">
                    Add to Cart
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
