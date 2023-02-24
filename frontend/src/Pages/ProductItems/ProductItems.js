import React from 'react';
import { useParams } from 'react-router-dom';

function ProductItems() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
}

export default ProductItems;
