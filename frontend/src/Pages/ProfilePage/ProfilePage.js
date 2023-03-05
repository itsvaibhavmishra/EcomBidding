import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../Store';
import './ProfilePage.css';

function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.name);

  const submitHandler = async () => {};
  return (
    <div>
      <Helmet>
        <title>Profile-EcomBidding</title>
      </Helmet>
      {/* component */}
      <div class="flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-6 sm:py-12">
        <div class="relative py-3 sm:mx-auto sm:max-w-xl">
          <div class="animate-spin-custom absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-300 to-cyan-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div class="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
            <div class="mx-auto max-w-md">
              <div>
                <h1 class="text-2xl font-semibold">
                  User Profile - Edit your profile
                </h1>
              </div>
              <div class="divide-y divide-gray-200">
                <form
                  class="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
                  onSubmit={submitHandler}
                >
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="name"
                      name="name"
                      type="text"
                      class="focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label
                      for="name"
                      class="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Name
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="email"
                      class="focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      class="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Email Address
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      class="focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      class="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Password
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      class="focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      class="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div class="relative">
                    <button
                      type="submit"
                      class="rounded-md bg-cyan-500 px-2 py-1 text-white duration-200 hover:bg-cyan-600"
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
