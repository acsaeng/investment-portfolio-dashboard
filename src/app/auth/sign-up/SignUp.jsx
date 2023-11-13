'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { Button, Form, Modal } from 'react-bootstrap';
import Loader from '@/app/components/Loader/Loader';
import { signOutUser, signUpUser } from '@/api/auth';
import PAGE from '@/utils/routes';
import { FORM_FIELDS, FORM_LABELS, MODAL_LABELS } from './constants';

import './SignUp.scss';

const SignUp = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const onSubmit = async (event) => {
    setShowLoader(true);
    event.preventDefault();

    try {
      await signUpUser(
        event.target.firstName.value,
        event.target.lastName.value,
        event.target.email.value,
        event.target.password.value,
        event.target.dob.value,
        event.target.gender.value
      );
      setModalContent({
        title: MODAL_LABELS.SUCCESS.TITLE,
        body: MODAL_LABELS.SUCCESS.BODY,
        button: MODAL_LABELS.SUCCESS.BUTTON,
        buttonEvent: null,
        href: PAGE.SIGN_IN,
      });
    } catch (error) {
      const errorMessage = error.message
        .substring(error.message.indexOf('/') + 1, error.message.lastIndexOf(')'))
        .replaceAll('-', ' ');
      setModalContent({
        title: MODAL_LABELS.ERROR.TITLE,
        body: errorMessage
          ? errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
          : MODAL_LABELS.ERROR.DEFAULT_BODY,
        button: MODAL_LABELS.ERROR.BUTTON,
        buttonEvent: () => setModalContent({}),
        href: null,
      });
    }

    setShowLoader(false);
  };

  useEffect(() => {
    signOutUser();
  }, []);

  return (
    <div className='sign-up'>
      <Loader isVisible={showLoader} />
      <div className='sign-up__container'>
        <Link className='sign-up__back-button' href={PAGE.FORGOT_PASSWORD}>
          {FORM_LABELS.BACK_LINK}
        </Link>
        <h6 className='sign-up__header'>{FORM_LABELS.FORM_HEADER}</h6>
        <Form className='sign-up__form' onSubmit={onSubmit}>
          <div className='sign-up__name-inputs-container'>
            <Form.Control
              className='sign-up__first-name-input'
              maxLength={FORM_FIELDS.FIRST_NAME.maxLength}
              name={FORM_FIELDS.FIRST_NAME.name}
              placeholder={FORM_FIELDS.FIRST_NAME.label}
              required
            />
            <Form.Control
              className='sign-up__last-name-input'
              maxLength={FORM_FIELDS.LAST_NAME.maxLength}
              name={FORM_FIELDS.LAST_NAME.name}
              placeholder={FORM_FIELDS.LAST_NAME.label}
              required
            />
          </div>
          <Form.Control
            className='sign-up__email-input'
            maxLength={FORM_FIELDS.EMAIL.maxLength}
            name={FORM_FIELDS.EMAIL.name}
            placeholder={FORM_FIELDS.EMAIL.label}
            required
            type={FORM_FIELDS.EMAIL.type}
          />
          <Form.Control
            className='sign-up__password-input'
            name={FORM_FIELDS.PASSWORD.name}
            // pattern={FORM_FIELDS.PASSWORD.pattern}
            title={FORM_FIELDS.PASSWORD.title}
            placeholder={FORM_FIELDS.PASSWORD.label}
            required
            type={FORM_FIELDS.PASSWORD.type}
          />
          <Form.Control
            className='sign-up__dob-input'
            name={FORM_FIELDS.DOB.name}
            placeholder={FORM_FIELDS.DOB.label}
            required
            type={FORM_FIELDS.DOB.type}
          />
          <Form.Select
            className='sign-up__gender-input'
            name={FORM_FIELDS.GENDER.name}
            placeholder={FORM_FIELDS.GENDER.label}
            required
          >
            {FORM_FIELDS.GENDER.options.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Form.Select>
          <Button className='sign-up__submit-button' type='submit'>
            {FORM_LABELS.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
      {!isEmpty(modalContent) && (
        <Modal backdrop='static' className='sign-up__success-modal' centered show>
          <Modal.Header>
            <Modal.Title>{modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalContent.body}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={modalContent.buttonEvent} href={modalContent.href}>
              {modalContent.button}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SignUp;
