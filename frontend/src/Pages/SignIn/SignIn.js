import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import wave from "./Assets/wave.png";
import avatar from "./Assets/avatar.svg";
import unlock from "./Assets/unlock.svg";

const LoginPage = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <img
        src={wave}
        alt="wave"
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: "-1" }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src={unlock}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          alt="unlock"
        />
        <form className="flex flex-col justify-center items-center w-1/2">
          <img src={avatar} className="w-32" alt="avatar" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Welcome to you
          </h2>
          <div className="relative">
            <i className="fa fa-user absolute text-primarycolor text-xl"></i>
            <input
              type="text"
              placeholder="username"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
            />
          </div>
          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
            <input
              type="password"
              placeholder="password"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
            />
          </div>
          <div className="flex">
            <Link
              to={`/signup?redirect=${redirect}`}
              className="self-start mt-4 mr-4 text-gray-600 font-bold"
            >
              New Customer?
            </Link>
            <Link to="/" className="self-end mt-4 ml-4 text-gray-600 font-bold">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
