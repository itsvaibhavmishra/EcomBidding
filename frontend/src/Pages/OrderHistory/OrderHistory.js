import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../Components/Loading/Loading';
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
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

  return (
    <div>
      <Helmet>
        <title>Order History-EcomBidding</title>
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
            <div
              className="border border-gray-300 rounded-md shadow-sm overflow-hidden mx-4 mb-4 hover:scale-[101%] backface-hidden duration-300"
              key={order._id}
            >
              <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-700">
                <div className="py-4 px-4 flex items-center">
                  {order.orderItems.map((item) => (
                    <img
                      src={item.image}
                      alt="User Avatar"
                      className="rounded-full w-6 h-6 mr-[-15px] md:flex"
                      key={item._id}
                    />
                  ))}
                  <span className="truncate ml-0 sm:ml-8 hidden lg:block">
                    {order._id}
                  </span>
                </div>
                <div className="py-4 px-4">
                  {order.createdAt.substring(0, 10)}
                </div>
                <div className="py-4 px-4 font-auto">
                  <small>₹</small>
                  {order.totalPrice.toFixed(2)}
                </div>
                <div
                  className={`py-4 px-4 ${
                    order.isPaid ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {order.isPaid ? 'Yes' : 'No'}
                </div>
                <div
                  className={`py-4 px-4 ${
                    order.isDelivered ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {order.isDelivered ? 'Yes' : 'No'}
                </div>
                <div className="py-3 px-auto lg:px-4 text-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900 focus:outline-none flex items-center "
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    <p className="p-[6px] bg-slate-200 rounded-md hover:bg-slate-300 duration-200">
                      Details
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
