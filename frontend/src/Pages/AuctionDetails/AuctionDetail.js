import { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import Loading from '../../Components/Loading/Loading';
import { Store } from '../../Store';

const initialState = {
  products: [],
  loading: true,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AuctionDetail = () => {
  const [{ loading, error }, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState('');
  const [socket, setSocket] = useState(null);

  const {
    state: { userInfo },
  } = useContext(Store);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get(`/api/auctions/${id}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = response.data;
        setAuction(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();

    const newSocket = io(process.env.REACT_APP_API_PROXY);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [id, userInfo.token]);

  useEffect(() => {
    if (socket) {
      socket.on('bid', (updatedAuction) => {
        setAuction(updatedAuction);
      });
    }
  }, [socket]);

  const handleSubmit = async (event, userName) => {
    event.preventDefault();
    const response = await axios.post(
      `/api/auctions/${id}/bids`,
      {
        bidder: userName,
        bidAmount: bid,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    const data = response.data;
    setAuction(data);
    setBid('');
    socket.emit('bid', data);
    toast.success('Bid Placed Successfully 🎉');
  };

  const handleBidChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setBid(value);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image of product */}
          <div className="w-full p-4">
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className=" w-full max-w-2xl rounded-lg shadow-lg object-contain"
            />
          </div>

          {/* Product details */}
          <div className="w-full p-4 mt-3 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{auction.title}</h2>
            <p className="text-gray-500 text-base mb-4">
              {auction.description}
            </p>

            {/* Time left for auction */}
            <TimeLeft endDate={auction.endDate} />

            {/* Current bid */}
            <div className="border-b border-gray-200 py-2 flex justify-between items-center mb-4">
              <p className="text-gray-500 text-sm">Starting Bid:</p>
              <p className="text-lg font-semibold">
                ₹{auction.startingBid.toLocaleString('en-IN')}
              </p>
              <p className="text-gray-500 text-sm">Current Bid:</p>
              <p className="text-lg font-semibold">
                ₹{auction.currentBid.toLocaleString('en-IN')}
              </p>
            </div>
            {auction.bids.length > 0 && (
              <div className="border-b border-gray-200 py-2">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500 text-sm">Highest Bidder</p>
                  <p className="text-lg font-semibold">
                    {auction.bids[auction.bids.length - 1].bidder}
                  </p>
                </div>
              </div>
            )}

            {/* New bid input field and submit button */}
            {new Date(auction.endDate).getTime() <= Date.now() ? (
              <>
                {auction.bids.length > 0 && (
                  <div className="border-b border-gray-200 py-2">
                    <p className="text-lg font-semibold">
                      {auction.bids[auction.bids.length - 1].bidder ===
                      userInfo.name ? (
                        <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white duration-200 rounded-md mt-4">
                          ADD TO CART
                        </button>
                      ) : (
                        <button
                          className="w-full py-2 px-4 cursor-not-allowed bg-gray-100 text-gray-400 duration-200 rounded-md mt-4"
                          disabled
                        >
                          Auction Ended
                        </button>
                      )}
                    </p>
                  </div>
                )}
              </>
            ) : auction.bids[auction.bids.length - 1].bidder ===
              userInfo.name ? (
              <button className="inline-block px-6 py-2 w-full leading-5 font-semibold rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-default">
                You have the highest bid 🎉
              </button>
            ) : userInfo ? (
              <form
                onSubmit={(e) => handleSubmit(e, userInfo.name)}
                className="flex items-center"
              >
                <div className="relative flex-grow mr-4">
                  <input
                    type="number"
                    className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your bid"
                    value={bid}
                    onChange={handleBidChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-lg">₹</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-block px-6 py-2 leading-5 font-semibold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Bid
                </button>
              </form>
            ) : (
              <Link to="/signin">
                <button className="inline-block px-6 py-2 leading-5 font-semibold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Login to bid
                </button>
              </Link>
            )}
            {auction.bids.length > 0 && (
              <div className="border-b border-gray-200 py-2 mt-4">
                <h3 className="text-lg font-bold mb-2">Bids History:</h3>
                {auction.bids.map((bid, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <p className="text-gray-500 text-sm">{bid.bidder}</p>
                    <p className="text-gray-500 text-sm">
                      ₹{bid.bidAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function TimeLeft({ endDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = (new Date(endDate) - new Date()) / 1000;
      if (duration <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(duration / (24 * 3600));
        const hours = Math.floor((duration % (24 * 3600)) / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <div className="border-t border-b border-gray-200 py-2 items-center mb-4">
      <p className="text-gray-500 text-sm">Time Left:</p>
      <div className="w-full p-4 mt-3 bg-white rounded-lg shadow-xl">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">{timeLeft.days}</div>
            <div className="text-sm text-gray-500">days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{timeLeft.hours}</div>
            <div className="text-sm text-gray-500">hours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{timeLeft.minutes}</div>
            <div className="text-sm text-gray-500">minutes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{timeLeft.seconds}</div>
            <div className="text-sm text-gray-500">seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetail;
