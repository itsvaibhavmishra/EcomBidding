import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function AuctionItem({ name, image, endTime, bidPrice }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = (new Date(endTime) - new Date()) / 1000;
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endTime]);

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <Helmet>
        <title>Auction House-EcomBidding</title>
      </Helmet>
      <img
        src={image}
        alt="ItemImage"
        className="w-full h-48 object-contain hover:scale-105 duration-500"
      />
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">Current Bid: ₹{bidPrice}</p>
        <p className="text-gray-600">
          Time Left: <span className="font-bold">{timeLeft}</span>
        </p>
        <Link to="/auctiondetails">
          <button className="w-full py-2 px-4 bg-gray-300 text-gray-600 duration-200 rounded-md mt-4 hover:bg-gray-400">
            Bid Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AuctionItem;
