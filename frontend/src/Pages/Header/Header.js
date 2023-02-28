import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import './Header.css';

export default function Navbar() {
  const [text, setText] = useState('');

  const searchClicked = () => {
    setText('');
    console.log(text);
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 mb-0 md:mb-0"
          >
            <span className="ml-3 text-3xl font-bold">
              <span className="text-cyan-500">Ecom</span>Bidding
            </span>
          </Link>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 mb-4 md:mt-0 md:mb-0 sm:mb-4 w-80"
                onChange={(event) => handleTextChange(event.target.value)}
                value={text}
              />
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="absolute top-0 right-0 h-full w-4 text-gray-500 mr-3"
                viewBox="0 0 24 24"
                cursor="pointer"
                onClick={searchClicked}
              >
                <path d="M22 22L15.5 15.5M15.5 15.5C17.9853 13.0152 17.9853 8.98481 15.5 6.5C13.0152 3.98528 8.98481 3.98528 6.5 6.5C3.98528 8.98481 3.98528 13.0152 6.5 15.5C8.98481 17.9853 13.0152 17.9853 15.5 15.5Z"></path>
              </svg>
            </div>
          </div>

          <nav className="flex lg:w-2/5 flex-wrap lg:justify-end items-center text-base md:ml-auto">
            <Link to="/" className="mr-5 hover:text-gray-900">
              Dashboard
            </Link>
            <Link
              to="/cart"
              className="relative inline-flex items-center mr-5 hover:text-gray-900"
            >
              <span className="relative inline-flex items-center rounded px-2.5 py-1.5 font-medium">
                {cart.cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 h-5 w-5 rounded-full bg-red-500 flex justify-center text-white text-xs items-center">
                    <span>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </span>
                )}
                <span className="ml-1.5 text-gray-900 text-base hover:text-gray-700">
                  Cart
                </span>
              </span>
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-900">
              Seller
            </Link>
            <Link to="/" className="hover:text-gray-900">
              Admin
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
