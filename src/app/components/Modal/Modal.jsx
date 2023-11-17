import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ buttonLabel, children, isVisible = true, onButtonClick, title = '' }) =>
  isVisible && (
    <BootstrapModal backdrop='static' className='modal' centered show>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button onClick={() => onButtonClick()}>{buttonLabel}</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );

Modal.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  isVisible: PropTypes.bool,
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
