import React from "react";
import { isEmpty } from "lodash";
import { Form, InputGroup } from "react-bootstrap";
import Modal from "@/app/components/Modal";
import { HOLDING_FORM_FIELD, MODAL_CONTENT } from "../constants";
import "./HoldingsModal.scss";

export interface ModalContent {
  action?: string;
  body?: React.ReactNode;
  buttonLabel?: string;
  symbol?: string;
  title?: string;
}

interface HoldingsModalProps {
  modalContent: ModalContent;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
}

const HoldingsModal: React.FC<HoldingsModalProps> = ({
  modalContent,
  onSubmit,
  setModalContent,
}) => {
  return (
    !isEmpty(modalContent) && (
      <Modal
        buttonAttributes={{
          ...(modalContent.action
            ? { form: "holding-form", type: "submit" }
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
          <Form
            className="holdings-modal"
            id="holding-form"
            onSubmit={onSubmit}
          >
            {modalContent.body || (
              <div className="form">
                {modalContent.action ===
                  MODAL_CONTENT.UPDATE_HOLDING.FORM.action && (
                  <div className="form-radio-button-group">
                    <Form.Check
                      {...HOLDING_FORM_FIELD.BUY_RADIO_BUTTON}
                      inline
                      required
                    />
                    <Form.Check
                      {...HOLDING_FORM_FIELD.SELL_RADIO_BUTTON}
                      inline
                      required
                    />
                  </div>
                )}
                <Form.Control
                  {...HOLDING_FORM_FIELD.SYMBOL_INPUT}
                  className="form-input"
                  disabled={
                    modalContent.action ===
                    MODAL_CONTENT.UPDATE_HOLDING.FORM.action
                  }
                  onInput={(event: React.FormEvent<HTMLInputElement>) =>
                    (event.currentTarget.value = (
                      "" + event.currentTarget.value
                    ).toUpperCase())
                  }
                  readOnly={
                    modalContent.action ===
                    MODAL_CONTENT.UPDATE_HOLDING.FORM.action
                  }
                  required
                  value={
                    modalContent.action ===
                    MODAL_CONTENT.UPDATE_HOLDING.FORM.action
                      ? modalContent.symbol
                      : undefined
                  }
                />
                <InputGroup className="form-input">
                  <Form.Control
                    {...HOLDING_FORM_FIELD.NUM_SHARES_INPUT}
                    required
                  />
                  <InputGroup.Text>
                    {HOLDING_FORM_FIELD.NUM_SHARES_INPUT.suffix}
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="form-input">
                  <InputGroup.Text>
                    {HOLDING_FORM_FIELD.PRICE_PER_SHARE_INPUT.prefix}
                  </InputGroup.Text>
                  <Form.Control
                    {...HOLDING_FORM_FIELD.PRICE_PER_SHARE_INPUT}
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

export default HoldingsModal;
