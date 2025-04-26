import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { Sku } from '@components/frontStore/catalog/product/single/Sku';

export default function GeneralInfo({ product }) {
  return (
    <Area
      id="SKUInfo"
      className="mt-8"
      coreComponents={[
        {
          component: { default: Sku },
          props: { sku: product.sku },
          sortOrder: 21,
          id: 'productSingleSku'
        }
      ]}
    />
  );
}

GeneralInfo.propTypes = {
  product: PropTypes.shape({
    sku: PropTypes.string.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 50
};

export const query = `
  query Query {
    product (id: getContextValue('productId')) {
      sku
    }
  }`;
