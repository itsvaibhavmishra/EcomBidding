import React from 'react';

export default function CheckoutSteps(props) {
  return (
    // new style
    <div className="flex items-center justify-center space-x-4 mx-8 mt-4">
      <div className="flex flex-col items-center">
        <button
          type="button"
          className={`h-8 w-8 rounded-full ${
            props.step1
              ? 'border-cyan-500 bg-cyan-500 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
              : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          }`}
          disabled={!props.step1}
        >
          <span className="sr-only">Step 1</span>1
        </button>
        <p className="mt-1 font-medium text-gray-900 whitespace-nowrap">
          Sign In
        </p>
      </div>
      {props.step1 && props.step2 ? (
        <div className="w-full h-[3px] bg-blue-500"></div>
      ) : (
        <div className="w-full h-[3px] bg-gray-500"></div>
      )}

      <div className="flex flex-col items-center">
        <button
          type="button"
          className={`h-8 w-8 rounded-full ${
            props.step2
              ? ' border-cyan-500 bg-cyan-500 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
              : 'border border-gray-300 bg-white text-gray-500 opacity-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          }`}
          disabled={!props.step2}
        >
          <span className="sr-only">Step 2</span>2
        </button>
        <p className="mt-1 font-medium text-gray-900">Shipping</p>
      </div>
      {props.step2 && props.step3 ? (
        <div className="w-full h-[3px] bg-blue-500"></div>
      ) : (
        <div className="w-full h-[3px] bg-gray-500"></div>
      )}

      <div className="flex flex-col items-center">
        <button
          type="button"
          className={`h-8 w-8 rounded-full ${
            props.step3
              ? ' border-cyan-500 bg-cyan-500 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
              : 'border border-gray-300 bg-white text-gray-500 opacity-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          }`}
          disabled={!props.step3}
        >
          <span className="sr-only">Step 3</span>3
        </button>
        <p className="mt-1 font-medium text-gray-900">Payment</p>
      </div>
      {props.step3 && props.step4 ? (
        <div className="w-full h-[3px] bg-blue-500"></div>
      ) : (
        <div className="w-full h-[3px] bg-gray-500"></div>
      )}

      <div className="flex flex-col items-center">
        <button
          type="button"
          className={`h-8 w-8 rounded-full ${
            props.step4
              ? ' border-cyan-500 bg-cyan-500 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
              : 'border border-gray-300 bg-white text-gray-500 opacity-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          }`}
          disabled={!props.step4}
        >
          <span className="sr-only">Step 4</span>4
        </button>
        <p className="mt-1 font-medium text-gray-900 whitespace-nowrap">
          Place Order
        </p>
      </div>
    </div>
  );
}
