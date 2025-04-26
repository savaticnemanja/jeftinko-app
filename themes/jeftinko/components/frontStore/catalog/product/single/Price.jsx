import PropTypes from 'prop-types';
import React from 'react';

function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function Price({ regular, special }) {
  return (
    <h4 className="product-single-price">
      {special.value === regular.value && (
        <div>
          <span className="sale-price font-bold text-[#0050A0]">
            {formatPrice(regular.value)} RSD
          </span>
        </div>
      )}
      {special.value < regular.value && (
        <div>
          <span className="sale-price">{formatPrice(special.value)} RSD</span>{' '}
          <span className="regular-price">{formatPrice(regular.value)} RSD</span>
        </div>
      )}
    </h4>
  );
}

Price.propTypes = {
  regular: PropTypes.shape({
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  special: PropTypes.shape({
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};
