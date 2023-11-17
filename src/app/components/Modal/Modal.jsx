import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({
  buttonLabel = '',
  children,
  closeButton = false,
  header = '',
  isVisible = true,
  onButtonClick = () => {},
  onHide = () => {},
}) => (
  <BootstrapModal backdrop='static' className='modal' centered onHide={onHide} show={isVisible}>
    <BootstrapModal.Header closeButton={closeButton}>
      <BootstrapModal.Title>{header}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>{children}</BootstrapModal.Body>
    {buttonLabel && (
      <BootstrapModal.Footer>
        <Button onClick={() => onButtonClick()}>{buttonLabel}</Button>
      </BootstrapModal.Footer>
    )}
  </BootstrapModal>
);

Modal.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  closeButton: PropTypes.bool,
  header: PropTypes.string,
  isVisible: PropTypes.bool,
  onButtonClick: PropTypes.func,
  onHide: PropTypes.func,
};

export default Modal;
