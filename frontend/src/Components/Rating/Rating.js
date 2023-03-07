import React from 'react';

function Rating(props) {
  const { rating, reviews, caption } = props;
  return (
    <div className="rating flex justify-between">
      <span>
        <i
          className={
            rating >= 1
              ? 'fas fa-star text-amber-500'
              : rating >= 0.5
              ? 'fas fa-star-half-alt text-amber-500'
              : 'far fa-star text-amber-500'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fas fa-star text-amber-500'
              : rating >= 1.5
              ? 'fas fa-star-half-alt text-amber-500'
              : 'far fa-star text-amber-500'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fas fa-star text-amber-500'
              : rating >= 2.5
              ? 'fas fa-star-half-alt text-amber-500'
              : 'far fa-star text-amber-500'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fas fa-star text-amber-500'
              : rating >= 3.5
              ? 'fas fa-star-half-alt text-amber-500'
              : 'far fa-star text-amber-500'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fas fa-star text-amber-500'
              : rating >= 4.5
              ? 'fas fa-star-half-alt text-amber-500'
              : 'far fa-star text-amber-500'
          }
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span className="ml-auto">{' ' + reviews + ' reviews'}</span>
      )}
    </div>
  );
}

export default Rating;
