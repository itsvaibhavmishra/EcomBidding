import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';
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
          <Helmet>
            <title>Admin Dashboard-EcomBidding</title>
          </Helmet>
          <h1 className="bg-cyan-500 text-white py-4 px-8 font-bold text-2xl tracking-wide">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-cyan-500">
            <div className="bg-white rounded-lg shadow-lg p-4 mx-2 md:p-2 md:ml-8 md:mb-4 flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shadow shadow-red-400 bg-red-500 rounded-full mb-2 md:mb-6 mr-2">
                <i className="fas fa-user text-white text-lg"></i>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-base font-semibold text-gray-500 mr-4">
                  Total Users
                </p>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mr-4">
                  {summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0}
                </h3>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 mx-2 md:mx-0 md:p-2 md:mb-4 flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-500 shadow shadow-green-400 rounded-full mb-2 md:mb-6 mr-2">
                <i className="fas fa-shopping-cart text-white text-lg"></i>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-base font-semibold text-gray-500 mr-4">
                  Orders
                </p>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mr-4">
                  {summary.orders && summary.orders[0]
                    ? summary.orders[0].numOrders
                    : 0}
                </h3>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 mx-2 md:p-2 md:mr-8 mb-4 flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-orange-500 shadow shadow-orange-400 rounded-full mb-2 md:mb-6 mr-2">
                <i className="fas fa-chart-line text-white text-lg"></i>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-base font-semibold text-gray-500 mr-4">
                  Total Sales
                </p>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mr-4">
                  <small>₹</small>
                  {summary.orders && summary.orders[0]
                    ? summary.orders[0].totalSales.toLocaleString('en-IN')
                    : 0}
                </h3>
              </div>
            </div>
          </div>

          <div className="my-3 flex flex-row flex-wrap">
            <div className="w-full lg:w-1/2 my-3 lg:my-0 lg:border-r-2">
              <h2 className="p-4 px-8 font-bold text-2xl tracking-wide">
                Sales Graph
              </h2>
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
                  options={{
                    title: 'Daily Sales',
                    hAxis: {
                      title: 'Date',
                    },
                    vAxis: {
                      title: 'Sales',
                    },
                  }}
                ></Chart>
              )}
            </div>
            <div className="w-full lg:w-1/2 my-3 lg:my-0">
              <h2 className="p-4 px-8 font-bold text-2xl tracking-wide">
                Sales by Categories
              </h2>
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
                  options={{
                    title: 'Pie chart representation of sales by category',
                    legend: 'bottom',
                    pieSliceBorderColor: 'transparent',
                    pieHole: 0.5,
                    colors: [
                      '#6366F1',
                      '#F87171',
                      '#FCD34D',
                      '#34D399',
                      '#93C5FD',
                      '#A78BFA',
                      '#FBCFE8',
                      '#F3A3B5',
                      '#C6F6D5',
                      '#ECC94B',
                      '#B794F4',
                      '#FBBF24',
                      '#60A5FA',
                      '#D53F8C',
                      '#4FD1C5',
                      '#E11D48',
                    ],
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
