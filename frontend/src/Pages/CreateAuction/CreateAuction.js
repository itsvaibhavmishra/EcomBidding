import React, { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { getError } from '../../utils';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

const CreateAuction = () => {
  const {
    state: { userInfo },
  } = useContext(Store);

  const [{ error, loadingUpdate, loadingUpload }, dispatch] = useReducer(
    reducer,
    {
      error: '',
    }
  );

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState(100);
  const [imageUrl, setImageUrl] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.post(
        '/api/auctions',
        {
          title,
          description,
          startingBid,
          imageUrl,
          endDate,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      toast.success(data.message);
      navigate('/auction');
      // Handle success
      dispatch({ type: 'UPDATE_SUCCESS' });
    } catch (error) {
      toast(error.response.data.message);
      // Handle error
      dispatch({
        type: 'UPDATE_FAIL',
        payload: getError(error),
      });
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      toast.success('Image uploaded successfully');
      setImageUrl(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Auction-EcomBidding</title>
      </Helmet>

      {error ? (
        <ErrorPage />
      ) : (
        <div className="mx-auto max-w-7xl mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create New Auction
          </h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-bold mb-2">Image Preview</h3>
                <div className="h-64 bg-gray-100 flex justify-center items-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-400">No image provided</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-bold mb-2">Auction Details</h3>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startingBid"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Starting Bid
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="startingBid"
                      value={startingBid}
                      onChange={(e) => setStartingBid(e.target.value)}
                      className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none focus:shadow-outline"
                    />
                    <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                      <span className="text-gray-400">₹</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="imageUrl"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="imageUrl"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    onChange={uploadFileHandler}
                    className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none focus:shadow-outline"
                  />
                  {loadingUpload && <LoadingDots />}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="endDate"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="text-right">
                  <button
                    onClick={handleSubmit}
                    className="bg-cyan-500 hover:bg-cyan-600 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create Auction
                  </button>
                  {loadingUpdate && <LoadingDots />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAuction;
