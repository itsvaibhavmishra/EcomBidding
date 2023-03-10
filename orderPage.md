import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { Link } from 'react-router-dom';

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

function OrderPage() {
const { state } = useContext(Store);
const { userInfo } = state;

const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
loading: true,
error: '',
});

useEffect(() => {
const fetchData = async () => {
dispatch({ type: 'FETCH_REQUEST' });
try {
const { data } = await axios.get('/api/orders/mine', {
header: { Authorization: `Bearer ${userInfo.token}` },
});
dispatch({ type: 'FETCH_SUCCESS', payload: data });
} catch (error) {
dispatch({
type: 'FETCH_FAIL',
payload: getError(error),
});
}
};
fetchData();
}, [userInfo]);

// for dropdown
const [isOpen, setIsOpen] = useState(false);

function toggleDropdown() {
setIsOpen(!isOpen);
}

return (

<div>
<Helmet>
<title>Your Order-EcomBidding</title>
</Helmet>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
          Your Order Page is empty.{' '}
          <Link to="/" className="text-cyan-600 font-bold">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>

          {/* Primary card */}
          <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden mb-4">
            <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-300 font-medium text-sm">
              <div className="py-3 px-4">Name</div>
              <div className="py-3 px-4">Date</div>
              <div className="py-3 px-4">Total</div>
              <div className="py-3 px-4">Paid</div>
              <div className="py-3 px-4">Delivered</div>
              <div className="py-3 px-4">Actions</div>
            </div>
          </div>

          {orders.map((order) => (
            // Order card
            <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden mb-8">
              <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-700">
                <div className="py-4 px-4 flex items-center">
                  <img
                    src={order.image}
                    alt="UserAvatar"
                    className="rounded-full w-6 h-6 mr-2"
                  />
                  <span>{order.name}</span>
                </div>
                <div className="py-4 px-4">
                  {order.createdAt.substring(0, 10)}
                </div>
                <div className="py-4 px-4">
                  <small>₹</small>
                  {order.totalPrice.toFixed(2)}
                </div>
                <div
                  className={`py-4 px-4 ${
                    order.isPaid ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </div>
                <div
                  className={`py-4 px-4 ${
                    order.isDelivered ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </div>
                <div className="py-3 px-8 text-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900 focus:outline-none flex items-center "
                    onClick={toggleDropdown}
                  >
                    <i className="fas fa-ellipsis-v p-[6px] bg-slate-200 rounded-md"></i>
                  </button>
                  {isOpen && (
                    <div className="absolute mt-2 w-28 md:right-auto right-5 bg-white border rounded-md shadow-lg z-10 hidden">
                      <Link
                        to={`/order/${order._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/products/${order.url}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                      >
                        Buy More
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

);
}

export default OrderPage;
