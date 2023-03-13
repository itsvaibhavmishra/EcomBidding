import React, { useState } from 'react';

const AuctionDetails = () => {
  // State to hold the current bid value
  const [currentBid, setCurrentBid] = useState(500);

  // State to hold the user's bid value
  const [userBid, setUserBid] = useState('');

  // Handler for submitting a bid
  const handleBidSubmit = (event) => {
    event.preventDefault();
    const newBid = parseFloat(userBid);

    if (newBid && newBid > currentBid) {
      setCurrentBid(newBid);
      setUserBid('');
      // Handle bid submission logic here
    } else {
      alert('Please enter a valid bid that is higher than the current bid.');
    }
  };

  // Handler for updating the user's bid value
  const handleBidInput = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setUserBid(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Image of product */}
      <div className="w-full p-4">
        <img
          src="https://media.istockphoto.com/id/1436061606/photo/flying-colorful-womens-sneaker-isolated-on-white-background-fashionable-stylish-sports-shoe.jpg?b=1&s=170667a&w=0&k=20&c=GXD8Ci32Wa8c8Zc49domJFzqpCTaHgxe96_qfM7ml8w="
          alt="Product"
          className=" w-full max-w-2xl rounded-lg shadow-lg object-contain"
        />
      </div>

      {/* Product details */}
      <div className="w-full p-4 mt-3 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Adidas Shoes Pink Unisex</h2>
        <p className="text-gray-500 text-base mb-4">
          Adidas Unisex-Adult Fire Runner Profoam, Chalk Pink-White, Running
          Shoe - 4UK (37718206)
        </p>

        {/* Time left for auction */}
        <div className="border-t border-b border-gray-200 py-2 items-center mb-4">
          <p className="text-gray-500 text-sm">Time Left:</p>
          <div className="w-full p-4 mt-3 bg-white rounded-lg shadow-xl">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold">03</div>
                <div className="text-sm text-gray-500">days</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">12</div>
                <div className="text-sm text-gray-500">hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">32</div>
                <div className="text-sm text-gray-500">minutes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">12</div>
                <div className="text-sm text-gray-500">seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Current bid */}
        <div className="border-b border-gray-200 py-2 flex justify-between items-center mb-4">
          <p className="text-gray-500 text-sm">Current Bid:</p>
          <p className="text-lg font-semibold">₹{currentBid}</p>
        </div>

        {/* New bid input field and submit button */}
        <form onSubmit={handleBidSubmit} className="flex items-center">
          <div className="relative flex-grow mr-4">
            <input
              type="number"
              className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your bid"
              value={userBid}
              onChange={handleBidInput}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-lg">₹</span>
            </div>
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2 leading-5 font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Bid
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctionDetails;
