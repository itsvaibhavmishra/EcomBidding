import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Loading from '../../Components/Loading/Loading';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
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

export default function UserListPage() {
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users`, {
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

  const deleteHandler = async (user) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('user deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
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
        <title>Manage Users-EcomBidding</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
          No Users Found!
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Users List</h1>
          {loadingDelete && <LoadingDots />}

          {/* Primary card */}
          <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden mb-4">
            <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-300 font-medium text-sm overflow-x-auto">
              <div className="py-3 px-4 ml-16">ID</div>
              <div className="py-3 px-4">NAME</div>
              <div className="py-3 px-4">EMAIL</div>
              <div className="py-3 px-4">ADMIN</div>
              <div className="py-3 px-4">SELLER</div>
              <div className="py-3 px-4 ml-4 lg:ml-0">ACTIONS</div>
            </div>
          </div>

          {users.map((user) => (
            // Order card
            <div
              className="border border-gray-300 rounded-md shadow-sm overflow-hidden mx-4 mb-4 hover:scale-[101%] backface-hidden duration-300"
              key={user._id}
            >
              <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-700 overflow-x-auto">
                <div className="py-4 px-4 flex items-center">
                  <span className="truncate ml-2 hidden lg:block">
                    {user._id}
                  </span>
                </div>
                <div className="py-4 px-4">{user.name}</div>
                <div className="py-4 px-4">{user.email}</div>
                <div
                  className={`py-4 px-4 ${
                    user.isAdmin ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {user.isAdmin ? 'YES' : 'NO'}
                </div>
                <div
                  className={`py-4 px-4 ${
                    user.isSeller ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {user.isSeller ? 'YES' : 'NO'}
                </div>
                <div className="py-3 px-auto lg:px-4 text-center flex">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900 focus:outline-none flex items-center "
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                  >
                    <p className="p-[6px] bg-slate-200 rounded-md hover:bg-slate-300 duration-200">
                      Edit
                    </p>
                  </button>

                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900 ml-2 focus:outline-none flex items-center "
                    onClick={() => deleteHandler(user)}
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
