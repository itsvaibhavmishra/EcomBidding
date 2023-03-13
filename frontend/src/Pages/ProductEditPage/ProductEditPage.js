import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import { getError } from '../../utils';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import LoadingDots from '../../Components/LoadingDots/LoadingDots';

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
export default function ProductEditPage() {
  const params = useParams();
  const { id: productId } = params;
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [url, seturl] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        seturl(data.url);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setStock(data.stock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          url,
          price,
          image,
          category,
          brand,
          stock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
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
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Product-EcomBidding</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <form onSubmit={submitHandler} className="max-w-4xl m-auto">
          <h2 className="text-xl font-semibold text-center mt-4">
            Editing for Product: {productId}
          </h2>
          <div className="flex justify-center">
            <img src={image} alt={productId} className="w-1/3" />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="block">
              url
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e) => seturl(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="block">
              Price (in rupees)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="block">
              Image File
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="imageFile"
              className="block font-medium text-sm text-gray-700"
            >
              Upload File
            </label>
            <input
              type="file"
              name="imageFile"
              id="imageFile"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={uploadFileHandler}
            />
            {loadingUpload && <LoadingDots />}
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="block">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="block">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="block">
              Stock
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <button
              disabled={loadingUpdate}
              type="submit"
              className="bg-cyan-500 text-white font-bold py-2 px-4 rounded shadow"
            >
              Update
            </button>
            {loadingUpdate && <LoadingDots />}
          </div>
        </form>
      )}
    </>
  );
}
