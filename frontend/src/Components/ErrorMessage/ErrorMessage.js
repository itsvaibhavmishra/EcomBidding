import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorMessage(props) {
  return (
    <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
      {props}.{' '}
      <Link to="/" className="text-cyan-600 font-bold">
        Go Shopping
      </Link>
    </div>
  );
}
