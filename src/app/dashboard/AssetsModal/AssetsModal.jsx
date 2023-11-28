import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Form, InputGroup } from 'react-bootstrap';
import Modal from '@/app/components/Modal';
import { ASSET_FORM_FIELD, MODAL_CONTENT } from '../constants';
import './AssetsModal.scss';

const AssetsModal = ({ modalContent, onSubmit, setModalContent }) => {
  return (
    !isEmpty(modalContent) && (
      <Modal
        buttonAttributes={{
          ...(modalContent.action
            ? { form: 'asset-form', type: 'submit' }
            : {
                onClick: () => {
                  setModalContent({});
                },
              }),
        }}
        buttonLabel={modalContent.buttonLabel}
        closeButton={!!modalContent.action}
        onHide={() => {
          setModalContent({});
        }}
        title={modalContent.title}
      >
        {modalContent.action ? (
          <Form id='asset-form' onSubmit={onSubmit}>
            {modalContent.body || (
              <div className='assets-modal__form'>
                {modalContent.action === MODAL_CONTENT.UPDATE_ASSET.FORM.action && (
                  <div className='assets-modal__form-radio-button-group'>
                    <Form.Check {...ASSET_FORM_FIELD.BUY_RADIO_BUTTON} inline required />
                    <Form.Check {...ASSET_FORM_FIELD.SELL_RADIO_BUTTON} inline required />
                  </div>
                )}
                <Form.Control
                  {...ASSET_FORM_FIELD.SYMBOL_INPUT}
                  className='assets-modal__form-input'
                  disabled={modalContent.action === MODAL_CONTENT.UPDATE_ASSET.FORM.action}
                  onInput={(event) => (event.target.value = ('' + event.target.value).toUpperCase())}
                  readOnly={modalContent.action === MODAL_CONTENT.UPDATE_ASSET.FORM.action}
                  required
                  value={
                    modalContent.action === MODAL_CONTENT.UPDATE_ASSET.FORM.action ? modalContent.symbol : undefined
                  }
                />
                <InputGroup className='assets-modal__form-input'>
                  <Form.Control {...ASSET_FORM_FIELD.NUM_SHARES_INPUT} required />
                  <InputGroup.Text>{ASSET_FORM_FIELD.NUM_SHARES_INPUT.suffix}</InputGroup.Text>
                </InputGroup>
                <InputGroup className='assets-modal__form-input'>
                  <InputGroup.Text>{ASSET_FORM_FIELD.PRICE_PER_SHARE_INPUT.prefix}</InputGroup.Text>
                  <Form.Control {...ASSET_FORM_FIELD.PRICE_PER_SHARE_INPUT} required />
                </InputGroup>
              </div>
            )}
          </Form>
        ) : (
          modalContent.body
        )}
      </Modal>
    )
  );
};

AssetsModal.propTypes = {
  modalContent: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default AssetsModal;
