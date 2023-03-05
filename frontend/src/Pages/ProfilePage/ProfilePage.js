import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../Store';
import './ProfilePage.css';

function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async () => {};
  return (
    <div>
      <Helmet>
        <title>Profile-EcomBidding</title>
      </Helmet>
      {/* component */}
      <div className="flex min-h-fit flex-col justify-center overflow-hidden bg-gray-100 py-6 sm:py-12">
        <div className="relative py-3 sm:mx-auto sm:max-w-xl">
          <div className="animate-spin-custom absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-300 to-cyan-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="mx-auto max-w-md">
              <div>
                <h1 className="text-2xl font-semibold">
                  User Profile - Edit your profile
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
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="focus:border-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none text-base"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="confirmPassword"
                      name="password"
                      type="password"
                      className="focus:border-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none text-base"
                      placeholder="Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="rounded-md bg-cyan-500 px-2 py-1 text-white duration-200 hover:bg-cyan-600"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
