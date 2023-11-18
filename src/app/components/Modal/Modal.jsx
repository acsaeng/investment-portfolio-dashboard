import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({
  buttonAttributes = {},
  buttonLabel = '',
  children,
  closeButton = false,
  isVisible = true,
  onHide = () => {},
  title = '',
}) => (
  <BootstrapModal backdrop='static' className='modal' centered onHide={onHide} show={isVisible}>
    {title && (
      <BootstrapModal.Header closeButton={closeButton}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
    )}
    <BootstrapModal.Body>{children}</BootstrapModal.Body>
    {buttonLabel && (
      <BootstrapModal.Footer>
        <Button {...buttonAttributes}>{buttonLabel}</Button>
      </BootstrapModal.Footer>
    )}
  </BootstrapModal>
);

Modal.propTypes = {
  buttonAttributes: PropTypes.shape({
    onClick: PropTypes.func,
    type: PropTypes.string,
  }),
  buttonLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  closeButton: PropTypes.bool,
  isVisible: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
};

export default Modal;
