import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import './CartPage.css';

export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Cart-EcomBidding</title>
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            {cartItems.length === 0 ? (
              <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
                Cart is empty.{' '}
                <Link to="/" className="text-cyan-600 font-bold">
                  Go Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white border-b border-gray-200 shadow sm:rounded-lg hover:transform hover:scale-105 backface-hidden duration-500">
                <div className="overflow-x-auto max-w-full">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                      <tr className="hidden md:table-row">
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap px-6 py-4 md:px-2 md:py-3">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 whitespace-normal">
                                  <Link to={`/products/${item.url}`}>
                                    {item.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 md:px-2 md:py-3">
                            <div className="flex items-center">
                              <button
                                className={`mr-2 rounded-lg bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200 ${
                                  item.quantity === 1
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                                }`}
                                disabled={item.quantity === 1}
                                onClick={() =>
                                  updateCartHandler(item, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              <span className="text-sm font-medium text-gray-900 pr-2">
                                {item.quantity}
                              </span>
                              <button
                                className={`mr-2 rounded-lg bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200 ${
                                  item.quantity >= item.stock
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                                }`}
                                disabled={item.quantity >= item.stock}
                                onClick={() =>
                                  updateCartHandler(item, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            ₹{item.price.toLocaleString('en-IN')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            ₹
                            {(item.quantity * item.price).toLocaleString(
                              'en-IN'
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeItemHandler(item)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-4 hover:transform hover:scale-105 duration-500 mx-2">
            <div className="bg-white shadow-lg sm:rounded-lg md:-mt-3">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Items:</span>
                  <span className="text-gray-900 font-medium">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500">Total:</span>
                  <span className="text-gray-900 font-medium">
                    ₹
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded ${
                    cartItems.length === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
