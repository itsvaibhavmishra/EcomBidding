import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../Store';
import Loading from '../../Components/Loading/Loading';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';

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
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListPage() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('product created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  // for dropdown
  const [productId, setProductId] = useState(null);

  function toggleDropdown(newProductId) {
    if (newProductId === productId) {
      setProductId(null);
    } else {
      setProductId(newProductId);
    }
  }

  return (
    <div className="w-full mx-auto p-4">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
          No Products Found!
        </div>
      ) : (
        <>
          <Helmet>
            <title>Manage Products-EcomBidding</title>
          </Helmet>
          <div className="flex justify-between items-center mt-2 mb-8">
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              onClick={createHandler}
            >
              Create Product
            </button>
          </div>

          {loadingCreate && <LoadingDots />}
          {loadingDelete && <LoadingDots />}

          <div className="overflow-x-auto lg:overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    NAME
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PRICE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CATEGORY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    BRAND
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                      <img
                        src={product.image}
                        alt="product_image"
                        className="rounded-full w-6 h-6 md:flex-shrink-0 mix-blend-multiply"
                      />
                      <span className="ml-2">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <small>₹</small>
                      {product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="text-center">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-900 focus:outline-none flex items-center "
                          onClick={() => toggleDropdown(product._id)}
                        >
                          <i className="fas fa-ellipsis-v p-[6px] bg-slate-200 rounded-md"></i>
                        </button>
                        {productId === product._id && (
                          <div className="absolute mt-2 w-28 md:right-auto right-5 bg-white border rounded-md shadow-lg z-10">
                            <button
                              type="button"
                              className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100"
                              onClick={() =>
                                navigate(`/admin/product/${product._id}`)
                              }
                            >
                              Edit
                            </button>

                            <div className="hover:bg-gray-100 border-t">
                              <button
                                type="button"
                                className="block px-4 py-2 text-sm text-red-500 w-full hover:bg-gray-100"
                                onClick={() => deleteHandler(product)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={`px-2 mx-1 py-1 rounded-lg font-bold text-white bg-cyan-500 ${
                  x + 1 === Number(page) ? 'bg-cyan-500' : ''
                }`}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
