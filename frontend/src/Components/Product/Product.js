import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import Rating from '../Rating/Rating';

function Product(props) {
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
  );
}

export default Product;
