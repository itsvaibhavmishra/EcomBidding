import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Dashboard() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
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
    fetchData();
  }, [userInfo]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <>
          <h1>Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-md">
              <div className="px-4 py-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Users</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-md">
              <div className="px-4 py-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {summary.orders && summary.orders[0]
                    ? summary.orders[0].numOrders
                    : 0}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Orders</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-md">
              <div className="px-4 py-5">
                <h3 className="text-lg font-medium text-gray-900">
                  $
                  {summary.orders && summary.orders[0]
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Total Sales</p>
              </div>
            </div>
          </div>
          <div className="my-3">
            <h2>Sales</h2>
            {summary.dailyOrders.length === 0 ? (
              <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
                No Sale
              </div>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
                No Category
              </div>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
