import PropTypes from 'prop-types';
import React from 'react';

export function Sku({ sku }) {
  return (
    <div className="product-single-sku text-[#0050A0bb]">
      <span>Šifra proizvoda</span>
      <span>: </span>
      {sku}
    </div>
  );
}

Sku.propTypes = {
  sku: PropTypes.string.isRequired
};
