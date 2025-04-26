import PropTypes from 'prop-types';
import React from 'react';

function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Price({ regular, special }) {
  return (
    <div className="product-price-listing text-[#204780]">
      {regular.value === special.value && (
        <div>
          <span className="sale-price font-semibold">
            {formatPrice(regular.value)} RSD
          </span>
        </div>
      )}
      {special.value < regular.value && (
        <div>
          <span className="sale-price text-critical font-semibold">
            {formatPrice(special.value)} RSD
          </span>{' '}
          <span className="regular-price font-semibold text-large">
            {formatPrice(regular.value)} RSD
          </span>
        </div>
      )}
    </div>
  );
}

Price.propTypes = {
  regular: PropTypes.shape({
    value: PropTypes.number,
    text: PropTypes.string
  }).isRequired,
  special: PropTypes.shape({
    value: PropTypes.number,
    text: PropTypes.string
  }).isRequired
};

export { Price };
