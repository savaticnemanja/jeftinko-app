import PropTypes from 'prop-types';
import React from 'react';
import DiscountBadge from '../../DiscountBadge';
import './Thumbnail.scss';

export function Thumbnail({ url, imageUrl, alt, regular, special }) {
  return (
    <a href={url} className="product-thumbnail-listing flex relative">
      {imageUrl && <img src={imageUrl} alt={alt} />}
      <DiscountBadge regular={regular} special={special} />
    </a>
  );
}

Thumbnail.propTypes = {
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  regular: PropTypes.shape({
    value: PropTypes.number,
  }).isRequired,
  special: PropTypes.shape({
    value: PropTypes.number,
  }).isRequired,
};

Thumbnail.defaultProps = {
  imageUrl: '',
  alt: '',
};
