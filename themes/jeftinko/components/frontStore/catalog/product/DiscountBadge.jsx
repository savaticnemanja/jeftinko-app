import PropTypes from "prop-types";
import React from "react";

export default function DiscountBadge({ regular, special }) {
  if (!regular || !special || special.value >= regular.value) {
    return null;
  }
  const percent = Math.round(
    ((regular.value - special.value) / regular.value) * 100
  );
  return (
    <span className="discount-badge absolute top-0 right-0 bg-red-600 text-white text-s font-bold rounded-tr-[8px] px-4 py-4">
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
