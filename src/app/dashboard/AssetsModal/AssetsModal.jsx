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
                {modalContent.action === MODAL_CONTENT.BUY_OR_SELL_ASSET.FORM.action && (
                  <div className='assets-modal__form-radio-button-group'>
                    <Form.Check
                      inline
                      label={ASSET_FORM_FIELD.BUY_OR_SELL.buyLabel}
                      name={ASSET_FORM_FIELD.BUY_OR_SELL.name}
                      required
                      type={ASSET_FORM_FIELD.BUY_OR_SELL.type}
                      value={ASSET_FORM_FIELD.BUY_OR_SELL.buyValue}
                    />
                    <Form.Check
                      inline
                      label={ASSET_FORM_FIELD.BUY_OR_SELL.sellLabel}
                      name={ASSET_FORM_FIELD.BUY_OR_SELL.name}
                      required
                      type={ASSET_FORM_FIELD.BUY_OR_SELL.type}
                      value={ASSET_FORM_FIELD.BUY_OR_SELL.sellValue}
                    />
                  </div>
                )}
                <Form.Control
                  className='assets-modal__form-input'
                  disabled={modalContent.action === MODAL_CONTENT.BUY_OR_SELL_ASSET.FORM.action}
                  maxLength={ASSET_FORM_FIELD.SYMBOL.maxLength}
                  name={ASSET_FORM_FIELD.SYMBOL.name}
                  onInput={(event) => (event.target.value = ('' + event.target.value).toUpperCase())}
                  placeholder={ASSET_FORM_FIELD.SYMBOL.label}
                  readOnly={modalContent.action === MODAL_CONTENT.BUY_OR_SELL_ASSET.FORM.action}
                  required
                  value={
                    modalContent.action === MODAL_CONTENT.BUY_OR_SELL_ASSET.FORM.action
                      ? modalContent.symbol
                      : undefined
                  }
                />
                <InputGroup className='assets-modal__form-input'>
                  <Form.Control
                    min={ASSET_FORM_FIELD.NUM_SHARES.min}
                    name={ASSET_FORM_FIELD.NUM_SHARES.name}
                    placeholder={ASSET_FORM_FIELD.NUM_SHARES.label}
                    required
                    type={ASSET_FORM_FIELD.NUM_SHARES.type}
                  />
                  <InputGroup.Text>{ASSET_FORM_FIELD.NUM_SHARES.suffix}</InputGroup.Text>
                </InputGroup>
                <InputGroup className='assets-modal__form-input'>
                  <InputGroup.Text>{ASSET_FORM_FIELD.PRICE_PER_SHARE.prefix}</InputGroup.Text>
                  <Form.Control
                    maxLength={ASSET_FORM_FIELD.PRICE_PER_SHARE.maxLength}
                    min={ASSET_FORM_FIELD.PRICE_PER_SHARE.min}
                    name={ASSET_FORM_FIELD.PRICE_PER_SHARE.name}
                    placeholder={ASSET_FORM_FIELD.PRICE_PER_SHARE.label}
                    required
                    step={ASSET_FORM_FIELD.PRICE_PER_SHARE.step}
                    type={ASSET_FORM_FIELD.PRICE_PER_SHARE.type}
                  />
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
