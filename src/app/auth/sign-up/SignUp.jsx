'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import { Button, Form } from 'react-bootstrap';
import Loader from '@/app/components/Loader/Loader';
import Modal from '@/app/components/Modal';
import { signOutUser, signUpUser } from '@/api/auth';
import PAGE from '@/utils/routes';
import { FORM_FIELD, FORM_LABEL, MODAL_LABEL } from './constants';
import './SignUp.scss';

const SignUp = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const router = useRouter();

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
        header: MODAL_LABEL.SUCCESS.HEADER,
        body: MODAL_LABEL.SUCCESS.BODY,
        button: MODAL_LABEL.SUCCESS.BUTTON,
        buttonEvent: () => router.push(PAGE.SIGN_IN),
      });
    } catch (error) {
      const errorMessage = error.message
        .substring(error.message.indexOf('/') + 1, error.message.lastIndexOf(')'))
        .replaceAll('-', ' ');
      setModalContent({
        header: MODAL_LABEL.ERROR.HEADER,
        body: errorMessage
          ? errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
          : MODAL_LABEL.ERROR.DEFAULT_BODY,
        button: MODAL_LABEL.ERROR.BUTTON,
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
        <Link className='sign-up__back-button' href={PAGE.SIGN_IN}>
          {FORM_LABEL.BACK_LINK}
        </Link>
        <h6 className='sign-up__header'>{FORM_LABEL.FORM_HEADER}</h6>
        <Form className='sign-up__form' onSubmit={onSubmit}>
          <div className='sign-up__name-inputs-container'>
            <Form.Control
              className='sign-up__first-name-input'
              maxLength={FORM_FIELD.FIRST_NAME.maxLength}
              name={FORM_FIELD.FIRST_NAME.name}
              placeholder={FORM_FIELD.FIRST_NAME.label}
              required
            />
            <Form.Control
              className='sign-up__last-name-input'
              maxLength={FORM_FIELD.LAST_NAME.maxLength}
              name={FORM_FIELD.LAST_NAME.name}
              placeholder={FORM_FIELD.LAST_NAME.label}
              required
            />
          </div>
          <Form.Control
            className='sign-up__email-input'
            maxLength={FORM_FIELD.EMAIL.maxLength}
            name={FORM_FIELD.EMAIL.name}
            placeholder={FORM_FIELD.EMAIL.label}
            required
            type={FORM_FIELD.EMAIL.type}
          />
          <Form.Control
            className='sign-up__password-input'
            name={FORM_FIELD.PASSWORD.name}
            // pattern={FORM_FIELD.PASSWORD.pattern}
            title={FORM_FIELD.PASSWORD.title}
            placeholder={FORM_FIELD.PASSWORD.label}
            required
            type={FORM_FIELD.PASSWORD.type}
          />
          <Form.Control
            className='sign-up__dob-input'
            name={FORM_FIELD.DOB.name}
            placeholder={FORM_FIELD.DOB.label}
            required
            type={FORM_FIELD.DOB.type}
          />
          <Form.Select
            className='sign-up__gender-input'
            name={FORM_FIELD.GENDER.name}
            placeholder={FORM_FIELD.GENDER.label}
            required
          >
            {FORM_FIELD.GENDER.options.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Form.Select>
          <Button className='sign-up__submit-button' type='submit'>
            {FORM_LABEL.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
      <Modal
        buttonLabel={modalContent.button}
        header={modalContent.header}
        isVisible={!isEmpty(modalContent)}
        onButtonClick={modalContent.buttonEvent}
      >
        {modalContent.body}
      </Modal>
    </div>
  );
};

export default SignUp;
