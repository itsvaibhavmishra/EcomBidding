import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../../Components/Rating/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import { Store } from '../../Store';
import './ProductItems.css';
import { toast } from 'react-toastify';

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
  const { url } = params;

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
        const result = await axios.get(`/api/products/url/${url}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, [url]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stock < quantity) {
      toast.error('Product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage />
  ) : (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 md:pr-8">
        <div className="max-w-7xl mx-auto">
          <img
            className="max-h-[35em] mb-4 md:mb-0 max-w-[30em] m-2 ml-3 product_image"
            src={product.image}
            alt={product.name}
          ></img>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="p-4">
          <Helmet>
            <title>{product.name}-EcomBidding</title>
          </Helmet>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="grid grid-cols-4 items-center mb-2">
            <div className="text-left">
              <Rating rating={product.rating} reviews={product.reviews} />
            </div>
          </div>
          <p className="text-lg mb-2">
            Price: <small>₹</small>
            {product.price.toLocaleString('en-IN')}
          </p>
          <p className="text-lg mb-2">Description: {product.description}</p>
        </div>
        <div className="p-4">
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between items-center">
              <span>Price:</span>
              <span className="font-bold">
                <small>₹</small>
                {product.price.toLocaleString('en-IN')}
              </span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <span>Status:</span>
              <span>
                {product.stock > 0 ? (
                  <span className="bg-green-500 text-white py-1 px-2 rounded">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-500 text-white py-1 px-2 rounded">
                    Unavailable
                  </span>
                )}
              </span>
            </li>
            {product.stock > 0 && (
              <li className="py-2">
                <div className="flex justify-center">
                  <button
                    onClick={addToCartHandler}
                    className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded w-auto"
                  >
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
