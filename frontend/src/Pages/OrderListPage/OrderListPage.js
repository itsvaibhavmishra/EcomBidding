import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function OrderListPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Manage Orders-EcomBidding</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
          No Orders Found!
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>
          {loadingDelete && <LoadingDots />}

          {/* Primary card */}
          <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden mb-4">
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-300 font-medium text-sm overflow-x-auto">
              <div className="py-3 px-4">ID</div>
              <div className="py-3 px-4">USER</div>
              <div className="py-3 px-4">DATE</div>
              <div className="py-3 px-4">TOTAL</div>
              <div className="py-3 px-4">PAID</div>
              <div className="py-3 px-4">DELIVERED</div>
              <div className="py-3 px-4 ml-4 lg:ml-0">ACTIONS</div>
            </div>
          </div>

          {orders.map((order) => (
            // Order card
            <div
              className="border border-gray-300 rounded-md shadow-sm overflow-hidden mx-4 mb-4 hover:scale-[101%] backface-hidden duration-300"
              key={order._id}
            >
              <div className="grid grid-cols-7 bg-gray-100 text-sm font-medium text-gray-700 overflow-x-auto">
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
                  {order.user ? order.user.name : 'DELETED USER'}
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
                  {order.isPaid ? 'Yes' : 'No'}
                </div>
                <div
                  className={`py-4 px-4 ${
                    order.isDelivered ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {order.isDelivered ? 'Yes' : 'No'}
                </div>
                <div className="py-3 px-auto lg:px-4 text-center flex">
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

                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900 ml-2 focus:outline-none flex items-center "
                    onClick={() => deleteHandler(order)}
                  >
                    <p className="p-[6px] bg-slate-200 rounded-md hover:bg-red-300 duration-200">
                      Delete
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
