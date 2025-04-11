import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import './Loader.scss';

const Loader = ({ isVisible = true }) =>
  isVisible && (
    <div className='loader'>
      <Spinner animation='border' className='loader__spinner' variant='light' />
    </div>
  );

Loader.propTypes = {
  isVisible: PropTypes.bool,
};

export default Loader;
