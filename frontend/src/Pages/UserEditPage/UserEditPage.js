import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function UserEditPage() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setIsSeller(data.isSeller);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin, isSeller },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('User updated successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Edit User Details-EcomBidding</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        //   component
        <div className="flex min-h-fit flex-col justify-center overflow-hidden bg-gray-100 py-6 sm:py-12">
          <div className="relative py-3 sm:mx-auto sm:max-w-xl">
            <div className="animate-spin-custom absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-300 to-cyan-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
            <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="mx-auto max-w-md">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Edit User: {userId}
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <form
                    className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
                    onSubmit={submitHandler}
                  >
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="focus:border-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none text-base"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="name"
                        className="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="focus:border-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none text-base"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="email"
                        className="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <label htmlFor="isAdmin" className="flex items-center">
                        <div className="relative">
                          <input
                            id="isAdmin"
                            name="isAdmin"
                            type="checkbox"
                            className="sr-only"
                            onChange={(e) => setIsAdmin(e.target.checked)}
                          />
                          <div className="block bg-gray-300 cursor-pointer w-14 h-8 rounded-full"></div>
                          <div
                            className={`dot cursor-pointer absolute left-1 top-1.5 w-5 h-5 rounded-full transition transform ${
                              isAdmin ? 'translate-x-6 bg-cyan-500' : 'bg-white'
                            }`}
                          ></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium">
                          IsAdmin
                        </div>
                      </label>
                      <label htmlFor="isSeller" className="flex items-center">
                        <div className="relative">
                          <input
                            id="isSeller"
                            name="isSeller"
                            type="checkbox"
                            className="sr-only"
                            onChange={(e) => setIsSeller(e.target.checked)}
                          />
                          <div className="block bg-gray-300 w-14 h-8 rounded-full cursor-pointer"></div>
                          <div
                            className={`dot cursor-pointer absolute left-1 top-1.5 w-5 h-5 rounded-full transition transform ${
                              isSeller
                                ? 'translate-x-6 bg-cyan-500'
                                : 'bg-white'
                            }`}
                          ></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium">
                          IsSeller
                        </div>
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="rounded-md bg-cyan-500 px-2 py-1 text-white duration-200 hover:bg-cyan-600"
                        disabled={loadingUpdate}
                      >
                        Update
                      </button>
                      {loadingUpdate && <LoadingDots />}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
