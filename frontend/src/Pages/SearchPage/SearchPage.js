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
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-lg font-medium mb-4">Department</h3>
          <ul className="mb-8 overflow-y-auto">
            <li>
              <Link
                to={getFilterUrl({ category: 'all' })}
                className={`${
                  category === 'all' ? 'font-bold' : ''
                } hover:text-blue-500`}
              >
                Any
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  to={getFilterUrl({ category: c })}
                  className={`${
                    category === c ? 'font-bold' : ''
                  } hover:text-blue-500`}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-medium mb-4">Price</h3>
          <ul className="mb-8">
            <li>
              <Link
                to={getFilterUrl({ price: 'all' })}
                className={`${
                  price === 'all' ? 'font-bold' : ''
                } hover:text-blue-500`}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  to={getFilterUrl({ price: p.value })}
                  className={`${
                    price === p.value ? 'font-bold' : ''
                  } hover:text-blue-500`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-medium mb-4">Avg. Customer Review</h3>
          <ul>
            {ratings.map((r) => (
              <li key={r.name}>
                <Link
                  to={getFilterUrl({ rating: r.rating })}
                  className={`${
                    `${r.rating}` === `${rating}` ? 'font-bold' : ''
                  } hover:text-blue-500`}
                >
                  <Rating caption={' & up'} rating={r.rating} />
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={getFilterUrl({ rating: 'all' })}
                className={`${
                  rating === 'all' ? 'font-bold' : ''
                } hover:text-blue-500`}
              >
                <Rating caption={' & up'} rating={0} />
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-3/4">
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorPage />
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
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
                      className="bg-gray-200 text-gray-600 text-sm px-2 py-1 ml-3"
                      onClick={() => navigate('/search')}
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  ) : null}
                </div>
                <div className="text-end">
                  <span>Sort by</span>
                  <select
                    className="bg-gray-200 text-gray-600 py-1 pl-2 pr-8 rounded-md ml-3"
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </div>
              </div>
              {products.length === 0 && (
                <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
                  No Product Found.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-5">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    className={`bg-gray-200 text-gray-600 py-1 px-2 rounded-md mx-1 ${
                      Number(page) === x + 1 ? 'bg-gray-600 text-white' : ''
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
    </div>
  );
}
