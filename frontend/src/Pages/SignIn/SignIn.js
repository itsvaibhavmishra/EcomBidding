import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import wave from './Assets/wave.png';
import avatar from './Assets/avatar.svg';
import unlock from './Assets/unlock.svg';
import axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from '../../utils';

function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="relative">
      <ToastContainer position="bottom-center" limit={1} />
      <Helmet>
        <title>Sign In-Bidding</title>
      </Helmet>

      <h2 className="absolute top-[5%] right-[5%] text-3xl font-bold">
        <Link to={'/'}>
          <i className="fas fa-times text-cyan-500 hover:animate-pulse delay-500"></i>
        </Link>
      </h2>

      <img
        src={wave}
        alt="wave"
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: '-1' }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src={unlock}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          alt="unlock"
        />
        <form
          className="flex flex-col justify-center items-center w-1/2"
          onSubmit={submitHandler}
        >
          <img src={avatar} className="w-32" alt="avatar" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Welcome to you
          </h2>
          <div className="relative font-sans">
            <i className="fa fa-user absolute text-primarycolor"></i>
            <input
              type="email"
              placeholder="Email"
              className="pl-8 w-64 border-b-2 font-display outline-none focus:border-primarycolor transition-all duration-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-primarycolor"></i>
            <input
              type="password"
              placeholder="Password"
              className="pl-8 w-64 border-b-2 font-display outline-none focus:border-primarycolor transition-all duration-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex">
            <Link
              to={`/signup?redirect=${redirect}`}
              className="self-start py-4 mt-4 mr-4 text-gray-600 font-semibold opacity-75 hover:opacity-100 transition-all duration-500"
            >
              New Customer?
            </Link>
            <Link
              to="/"
              className="self-end py-4 mt-4 ml-4 text-gray-600 font-bold opacity-75 hover:opacity-100 transition-all duration-500"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="py-3 px-20 bg-primarycolor rounded-full text-white font-semibold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
