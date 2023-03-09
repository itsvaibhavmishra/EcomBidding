import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function ProductEditPage() {
  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [url, seturl] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
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
        setCountInStock(data.countInStock);
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <form>
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
              Price
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
            <label htmlFor="countInStock" className="block">
              Count In Stock
            </label>
            <input
              type="text"
              id="countInStock"
              name="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="block">
              Description
            </label>
            <input
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
              type="submit"
              className="bg-cyan-500 text-white font-bold py-2 px-4 rounded shadow"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </>
  );
}
