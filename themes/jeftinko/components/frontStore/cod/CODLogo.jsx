import PropTypes from 'prop-types';
import React from 'react';

export default function CODLogo() {
  return (
    <span className="inline-block bg-[#012D73] p-2 rounded-[4px] font-bold text-white text-center leading-[30px]">
        Plaćanje pouzećem
    </span>

  );
}

CODLogo.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

CODLogo.defaultProps = {
  height: 30,
  width: 100
};
