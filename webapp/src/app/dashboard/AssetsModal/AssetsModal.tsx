import React from "react";
import { isEmpty } from "lodash";
import { Form, InputGroup } from "react-bootstrap";
import Modal from "@/app/components/Modal";
import { ASSET_FORM_FIELD, MODAL_CONTENT } from "../constants";
import "./AssetsModal.scss";

type ModalContent = {
  action?: string;
  body?: React.ReactNode;
  buttonLabel?: string;
  symbol?: string;
  title?: string;
};

interface AssetsModalProps {
  modalContent: ModalContent;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setModalContent: (content: Partial<ModalContent> | {}) => void;
}

const AssetsModal: React.FC<AssetsModalProps> = ({
  modalContent,
  onSubmit,
  setModalContent,
}) => {
  return (
    !isEmpty(modalContent) && (
      <Modal
        buttonAttributes={{
          ...(modalContent.action
            ? { form: "asset-form", type: "submit" }
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
          <Form className="assets-modal" id="asset-form" onSubmit={onSubmit}>
            {modalContent.body || (
              <div className="form">
                {modalContent.action ===
                  MODAL_CONTENT.UPDATE_ASSET.FORM.action && (
                  <div className="form-radio-button-group">
                    <Form.Check
                      {...ASSET_FORM_FIELD.BUY_RADIO_BUTTON}
                      inline
                      required
                    />
                    <Form.Check
                      {...ASSET_FORM_FIELD.SELL_RADIO_BUTTON}
                      inline
                      required
                    />
                  </div>
                )}
                <Form.Control
                  {...ASSET_FORM_FIELD.SYMBOL_INPUT}
                  className="form-input"
                  disabled={
                    modalContent.action ===
                    MODAL_CONTENT.UPDATE_ASSET.FORM.action
                  }
                  onInput={(event: React.FormEvent<HTMLInputElement>) =>
                    (event.currentTarget.value = (
                      "" + event.currentTarget.value
                    ).toUpperCase())
                  }
                  readOnly={
                    modalContent.action ===
                    MODAL_CONTENT.UPDATE_ASSET.FORM.action
                  }
                  required
                  value={
                    modalContent.action ===
                    MODAL_CONTENT.UPDATE_ASSET.FORM.action
                      ? modalContent.symbol
                      : undefined
                  }
                />
                <InputGroup className="form-input">
                  <Form.Control
                    {...ASSET_FORM_FIELD.NUM_SHARES_INPUT}
                    required
                  />
                  <InputGroup.Text>
                    {ASSET_FORM_FIELD.NUM_SHARES_INPUT.suffix}
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="form-input">
                  <InputGroup.Text>
                    {ASSET_FORM_FIELD.PRICE_PER_SHARE_INPUT.prefix}
                  </InputGroup.Text>
                  <Form.Control
                    {...ASSET_FORM_FIELD.PRICE_PER_SHARE_INPUT}
                    required
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

export default AssetsModal;
