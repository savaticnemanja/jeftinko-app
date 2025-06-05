/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import ProductNoThumbnail from '@components/common/ProductNoThumbnail';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DiscountBadge from '@components/frontStore/catalog/product/DiscountBadge';

function Current({ image, price }) {
  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(document.getElementById('product-current-image').offsetWidth);
  }, []);

  return (
    <div
      id="product-current-image"
      style={{ minHeight: height, background: '#fff', borderBottom: '1px solid #eaeaea' }}
      className="product-image product-single-page-image flex justify-center items-center relative"
    >
      {image && (
        <img src={image.single} alt={image.alt} className="self-center" />
      )}
      {!image && <ProductNoThumbnail width={250} height={250} />}
      <DiscountBadge regular={price.regular} special={price.special} />
    </div>
  );
}

Current.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    single: PropTypes.string.isRequired
  }),
  price: PropTypes.shape({
    regular: PropTypes.shape({
      value: PropTypes.number,
    }),
    special: PropTypes.shape({
      value: PropTypes.number,
    }),
  }),
};

Current.defaultProps = {
  image: null,
  price: null,
};

export default function Images({ product: { uuid, image, gallery = [], price } }) {
  const [current, setCurrent] = React.useState(image);
  const [thumbs, setThumbs] = React.useState(gallery);

  React.useEffect(() => {
    setCurrent(image);
    setThumbs(() => {
      const gls = [...gallery];
      if (image) {
        // Add image to beginning of gallery
        gls.unshift(image);
      }
      return gls;
    });
  }, [uuid]);

  return (
    <div className="product-single-media">
      <Current image={current} price={price} />
      <ul className="more-view-thumbnail product-gallery mt-8 grid grid-cols-4 gap-4">
        {thumbs.map((i, j) => (
          <li key={j} className="flex justify-center items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrent({ ...i });
              }}
              className=""
            >
              <img className="self-center" src={i.thumb} alt={i.alt} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Images.propTypes = {
  product: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    image: PropTypes.shape({
      alt: PropTypes.string,
      single: PropTypes.string.isRequired
    }),
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        single: PropTypes.string.isRequired
      })
    ),
    price: PropTypes.shape({
      regular: PropTypes.shape({
        value: PropTypes.number,
      }),
      special: PropTypes.shape({
        value: PropTypes.number,
      }),
    })
  }).isRequired
};

export const layout = {
  areaId: 'productPageMiddleLeft',
  sortOrder: 10
};

export const query = `
  query Query {
    product (id: getContextValue('productId')) {
      uuid
      image {
        alt
        thumb
        single
      }
      gallery {
        alt
        thumb
        single
      }
      price {
        regular {
          value
        }
        special {
          value
        }
      }
    }
  }
`;
