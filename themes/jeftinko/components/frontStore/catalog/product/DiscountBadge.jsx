import PropTypes from 'prop-types';
import React from 'react';

export default function DiscountBadge({ regular, special }) {
  if (!regular || !special || special.value >= regular.value) {
    return null;
  }
  const percent = Math.round(((regular.value - special.value) / regular.value) * 100);
  return (
    <span className="discount-badge absolute top-0 right-0 m-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
      -{percent}%
    </span>
  );
}

DiscountBadge.propTypes = {
  regular: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
  special: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
};
