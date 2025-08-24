import React from 'react';
import { Spinner } from 'react-bootstrap';

import './Loader.scss';

interface LoaderProps {
  isVisible?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isVisible = true }) =>
  isVisible ? (
    <div className='loader'>
      <Spinner animation='border' className='spinner' variant='light' />
    </div>
  ) : null;

export default Loader;
