import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

interface ModalProps {
  buttonAttributes?: React.ComponentProps<typeof Button>;
  buttonLabel?: string;
  children: ReactNode;
  closeButton?: boolean;
  isVisible?: boolean;
  onHide?: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  buttonAttributes = {},
  buttonLabel = '',
  children,
  closeButton = false,
  isVisible = true,
  onHide = () => {},
  title = '',
}) => (
  <BootstrapModal backdrop='static' className='modal' centered onHide={onHide} show={isVisible}>
    {(title || closeButton) && (
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

export default Modal;
