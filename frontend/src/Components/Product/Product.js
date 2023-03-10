import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
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
    <div className="items border border-solid border-lightgray m-4">
      <Link to={`/products/${product.url}`}>
        <img
          className="w-full max-h-72"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="items__info p-4">
        <Link to={`/products/${product.url}`}>
          <p>{product.name}</p>
          <Rating rating={product.rating} reviews={product.reviews} />
          <p className="text-sm text-left">
            <small>₹</small>
            {product.price.toLocaleString('en-IN')}
          </p>
        </Link>
        {product.stock === 0 ? (
          <button
            className={`bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mt-4 ${
              product.stock === 0 ? 'opacity-50 pointer-events-none' : ''
            }`}
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
  );
}

export default Product;
