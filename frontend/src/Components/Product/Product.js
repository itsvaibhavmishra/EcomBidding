import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-toastify';

function Product(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === product._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      toast.error('Product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const { product } = props;

  return (
    <div className="flex flex-wrap overflow-x-hidden">
      <div className="w-96 p-4">
        <div className="h-full rounded-lg overflow-hidden shadow-md border border-gray-200">
          <Link to={`/products/${product.url}`}>
            <img
              className="w-full h-64 object-contain mx-auto hover:scale-105 duration-500"
              src={product.image}
              alt={product.name}
            />
          </Link>
          <div className="p-4">
            <Link to={`/products/${product.url}`}>
              <h2 className="text-gray-900 font-medium mb-2">{product.name}</h2>
              <div className="items-center mb-4">
                <Rating rating={product.rating} reviews={product.reviews} />
              </div>
              <p className="text-gray-700 font-medium text-lg mb-4">
                <small>₹</small>
                {product.price.toLocaleString('en-IN')}
              </p>
            </Link>
            {product.stock === 0 ? (
              <button
                className={`bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mt-4 ${
                  product.stock === 0 ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled
              >
                Out of Stock
              </button>
            ) : (
              <button
                className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mt-4"
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
