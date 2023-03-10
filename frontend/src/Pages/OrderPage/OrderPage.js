import React, { useContext, useEffect, useReducer } from 'react';
import Loading from '../../Components/Loading/Loading';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      return state;
  }
};

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const totalPriceUSD = order.totalPrice / 81.71;

  const createOrder = (data, action) => {
    return action.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPriceUSD.toFixed(2) },
          },
        ],
      })
      .then((orderID) => {
        return orderID; // orderID is coming from PayPal
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        // after payment is successful
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order Paid Succefully🎉');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  };
  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate('/signin');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPayPalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order Delivered Successfully 🎉');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage />
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}-EcomBidding</title>
      </Helmet>

      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl light:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #{orderId}
          </h1>
          <p className="text-base light:text-gray-300 font-medium leading-6 text-gray-600">
            {new Intl.DateTimeFormat('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
              timeZoneName: 'short',
            }).format(new Date(order.createdAt))}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start light:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl light:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              {order.orderItems.map((item) => (
                <div
                  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  key={item._id}
                >
                  <div className="pb-4 md:pb-8 w-20">
                    <img
                      className="w-full hidden md:block"
                      src={item.image}
                      alt={item.name}
                    />
                    <img
                      className="w-full md:hidden"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl light:text-white font-semibold leading-6 text-gray-800">
                        <Link to={`/products/${item.url}`}>{item.name}</Link>
                      </h3>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base light:text-white xl:text-lg leading-6">
                        <small>₹</small>
                        {item.price}
                      </p>
                      <p className="text-base light:text-white xl:text-lg leading-6 text-gray-800">
                        {item.quantity}
                      </p>
                      <p className="text-base light:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                        <small>₹</small>
                        {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 light:bg-gray-800 space-y-6">
                <h3 className="text-xl light:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base light:text-white leading-4 text-gray-800">
                      Items
                    </p>
                    <p className="text-base light:text-gray-300 leading-4 text-gray-600">
                      <small>₹</small>
                      {order.itemsPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base light:text-white leading-4 text-gray-800">
                      Tax
                    </p>
                    <p className="text-base light:text-gray-300 leading-4 text-gray-600">
                      <small>₹</small>
                      {order.taxPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base light:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base light:text-gray-300 leading-4 text-gray-600">
                      <small>₹</small>
                      {order.shippingPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-xs light:text-white leading-4 text-center text-gray-300">
                    Paypal does not accept payments in INR
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base light:text-white font-semibold leading-4 text-gray-800">
                    Total in USD
                  </p>
                  <p className="text-base light:text-gray-300 font-semibold leading-4 text-gray-600">
                    <small>$</small>
                    {totalPriceUSD.toFixed(2)}
                  </p>
                </div>
                {!order.isPaid && (
                  <div className=" w-full">
                    {isPending ? (
                      <LoadingDots />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                    {loadingPay && <LoadingDots />}
                  </div>
                )}

                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <div className="w-full">
                    {loadingDeliver && <LoadingDots />}
                    <div className="flex justify-center">
                      <button
                        className="bg-yellow-500 text-white font-medium py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-200 w-full"
                        type="button"
                        onClick={deliverOrderHandler}
                      >
                        Deliver Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 light:bg-gray-800 space-y-6">
                <h3 className="text-xl light:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 light:text-white font-semibold text-gray-800">
                        Payment Method
                        <br />
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 light:text-white text-gray-800">
                    {order.paymentMethod}
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div
                    className={`light:bg-white light:text-gray-800 light:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full text-center font-medium leading-4 text-white 
                    ${
                      order.isPaid
                        ? 'bg-green-500 hover:bg-green-600 duration-500'
                        : 'bg-red-500 hover:bg-red-600 duration-500'
                    }
                    `}
                  >
                    {order.isPaid
                      ? `Paid at: ${new Intl.DateTimeFormat('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          timeZoneName: 'short',
                        }).format(new Date(order.paidAt))}`
                      : 'NOT PAID'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 light:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl light:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base light:text-white font-semibold leading-4 text-left text-gray-800">
                      {userInfo.name}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 light:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <i className="far fa-envelope light:hidden text-xl"></i>
                  <i className="far fa-envelope hidden light:block text-xl"></i>
                  <p className="cursor-pointer text-sm leading-5 ">
                    {userInfo.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base light:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full light:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {order.shippingAddress.fullName}, <br />
                      {order.shippingAddress.address},
                      {order.shippingAddress.city}, <br />
                      {order.shippingAddress.pinCode},
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base light:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
                    </p>
                    <p className="w-48 lg:w-full light:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {order.shippingAddress.fullName}, <br />
                      {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city}, <br />
                      {order.shippingAddress.pinCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <div
                    className={`mt-6 md:mt-0 light:border-white light:hover:bg-gray-900 light:bg-transparent light:text-white py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border font-medium w-96 2xl:w-full text-center leading-4 text-white ${
                      order.isDelivered
                        ? 'bg-green-500 hover:bg-green-600 duration-500'
                        : 'bg-red-500 hover:bg-red-600 duration-500'
                    }`}
                  >
                    {order.isDelivered
                      ? `Delivered at: ${new Intl.DateTimeFormat('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          timeZoneName: 'short',
                        }).format(new Date(order.deliveredAt))}`
                      : 'NOT DELIVERED'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
