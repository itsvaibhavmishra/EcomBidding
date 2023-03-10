import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getError } from '../../utils';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Rating from '../../Components/Rating/Rating';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import Product from '../../Components/Product/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  {
    name: '₹500 to ₹1000',
    value: '500-1000',
  },
  {
    name: '₹1001 to ₹5000',
    value: '1001-5000',
  },
  {
    name: '₹5000 and up',
    value: '5001-1000000',
  },
];

export const ratings = [
  {
    name: '4stars and up',
    rating: 4,
  },
  {
    name: '3stars and up',
    rating: 3,
  },
  {
    name: '2stars and up',
    rating: 2,
  },
  {
    name: '1stars and up',
    rating: 1,
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;

    return `/search?page=${filterPage}&category=${filterCategory}&query=${filterQuery}&rating=${filterRating}&price=${filterPrice}&order=${sortOrder}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Result-EcomBidding</title>
      </Helmet>
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : (
          <>
            <div className="bg-cyan-500 py-3 px-6 shadow-md mb-4 flex text-sm justify-between items-center">
              <div className="text-white">
                <div>
                  {countProducts === 0 ? 'No' : countProducts} Results Found
                  {query !== 'all' && ' : ' + query}
                  {category !== 'all' && ' : ' + category} for '{category}'
                  {price !== 'all' && ' : Price ' + price}
                  {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                  {query !== 'all' ||
                  category !== 'all' ||
                  rating !== 'all' ||
                  price !== 'all' ? (
                    <button
                      className="text-white text-sm px-2 ml-3"
                      onClick={() => navigate('/search')}
                    >
                      <i className="fas fa-times-circle hover:animate-pulse"></i>
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="relative ">
                <select
                  className="block appearance-none w-full text-xs bg-white border border-gray-400 hover:border-cyan-300 hover:shadow-cyan-300 px-4 py-1 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={order}
                  onChange={(e) => {
                    navigate(getFilterUrl({ order: e.target.value }));
                  }}
                >
                  <option value="newest">Sort by: Newest Arrivals</option>
                  <option value="lowest">Price: low to high</option>
                  <option value="highest">Price: high to low</option>
                  <option value="toprated">Avg. Customer Reviews</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-sort"></i>
                </div>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-auto lg:border-r-2 md:w-1/4 px-4">
                <h2 className="font-bold text-xl text-gray-700 mb-2">
                  Categories
                </h2>

                <Link
                  to={getFilterUrl({ category: 'all' })}
                  className={`${
                    category === 'all'
                      ? 'bg-gray-200 text-black w-full'
                      : 'text-gray-600 hover:text-cyan-500'
                  } flex items-center`}
                >
                  <span className="mr-2 ml-6">
                    <i className="fas fa-list"></i>
                  </span>
                  All
                </Link>

                <ul>
                  {categories.map((c) => (
                    <li key={c} className="mb-1 ml-4">
                      <Link
                        to={getFilterUrl({ category: c })}
                        className={`${
                          category === c
                            ? 'bg-cyan-500 text-white w-full'
                            : 'text-gray-600 hover:text-cyan-500'
                        } flex items-center`}
                      >
                        <span className="mr-2"></span>
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>

                <h2 className="font-bold text-xl text-gray-700 mb-2">Price</h2>

                <Link
                  to={getFilterUrl({ price: 'all' })}
                  className={`${
                    price === 'all'
                      ? 'bg-gray-200 text-black w-full'
                      : 'text-gray-600 hover:text-cyan-500'
                  } flex items-center`}
                >
                  <span className="mr-2 ml-6">
                    <i className="fas fa-list"></i>
                  </span>
                  All
                </Link>

                <ul>
                  {prices.map((p) => (
                    <li key={p.value} className="mb-1 ml-4">
                      <Link
                        to={getFilterUrl({ price: p.value })}
                        className={`${
                          price === p.value
                            ? 'bg-cyan-500 text-white w-full'
                            : 'text-gray-600 hover:text-cyan-500'
                        } flex items-center`}
                      >
                        <span className="mr-2"></span>
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <h2 className="font-bold text-xl text-gray-700 mb-2">
                  Avg. Customer Review
                </h2>

                <Link
                  to={getFilterUrl({ rating: 'all' })}
                  className={`${
                    rating === 'all'
                      ? 'bg-gray-200 text-black w-full'
                      : 'text-gray-600 hover:text-cyan-500'
                  } flex items-center`}
                >
                  <span className="mr-2 ml-6">
                    <i className="far fa-star"></i>
                  </span>
                  and above
                </Link>

                <ul>
                  {ratings.map((r) => (
                    <li key={r.name} className="mb-1 ml-4">
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={`${
                          `${r.rating}` === `${rating}` ? 'font-bold' : ''
                        } flex items-center text-gray-600 hover:text-blue-600`}
                      >
                        <span className="mr-2"></span>
                        <Rating caption={' & up'} rating={r.rating} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {products.length === 0 && (
                <div className="p-4 mx-auto my-auto border h-full rounded-md bg-gray-100 text-gray-700">
                  No Product Found
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:ml-8">
                {products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-5">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  className={`bg-gray-200 text-gray-600 py-1 px-2 rounded-md mx-1 ${
                    Number(page) === x + 1 ? 'bg-cyan-600 text-white' : ''
                  }`}
                  to={getFilterUrl({ page: x + 1 })}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
