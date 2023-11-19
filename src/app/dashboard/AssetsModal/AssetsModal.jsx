import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Modal from '@/app/components/Modal';
import { ASSET_FORM_FIELD } from './constants';
import './AssetsModal.scss';

const AssetsModal = ({ modalContent, onSubmit, setModalContent, setUserAction, userAction }) => {
  return (
    modalContent && (
      <Modal
        buttonAttributes={{
          ...(userAction
            ? { form: 'asset-form', type: 'submit' }
            : {
                onClick: () => {
                  setModalContent(null);
                },
              }),
        }}
        buttonLabel={modalContent.buttonLabel}
        closeButton={!!userAction}
        onHide={() => {
          setUserAction(null);
          setModalContent(null);
        }}
        title={modalContent.title}
      >
        {modalContent.body || (
          <Form className='assets-modal__form' id='asset-form' onSubmit={onSubmit}>
            <Form.Control
              className='assets-modal__form-input'
              maxLength={ASSET_FORM_FIELD.SYMBOL.maxLength}
              name={ASSET_FORM_FIELD.SYMBOL.name}
              placeholder={ASSET_FORM_FIELD.SYMBOL.label}
              required
            />
            <Form.Control
              className='assets-modal__form-input'
              min={ASSET_FORM_FIELD.NUM_SHARES.min}
              name={ASSET_FORM_FIELD.NUM_SHARES.name}
              placeholder={ASSET_FORM_FIELD.NUM_SHARES.label}
              required
              type={ASSET_FORM_FIELD.NUM_SHARES.type}
            />
            <Form.Control
              className='assets-modal__form-input'
              maxLength={ASSET_FORM_FIELD.PRICE_PER_SHARE.maxLength}
              min={ASSET_FORM_FIELD.PRICE_PER_SHARE.min}
              name={ASSET_FORM_FIELD.PRICE_PER_SHARE.name}
              placeholder={ASSET_FORM_FIELD.PRICE_PER_SHARE.label}
              required
              step={ASSET_FORM_FIELD.PRICE_PER_SHARE.step}
              type={ASSET_FORM_FIELD.PRICE_PER_SHARE.type}
            />
          </Form>
        )}
      </Modal>
    )
  );
};

AssetsModal.propTypes = {
  modalContent: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setUserAction: PropTypes.func.isRequired,
  userAction: PropTypes.string.isRequired,
};

export default AssetsModal;
