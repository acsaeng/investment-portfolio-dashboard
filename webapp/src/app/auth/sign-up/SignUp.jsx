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
        title: MODAL_LABEL.SUCCESS.TITLE,
        body: MODAL_LABEL.SUCCESS.BODY,
        button: MODAL_LABEL.SUCCESS.BUTTON,
        buttonEvent: () => router.push(PAGE.SIGN_IN),
      });
    } catch (error) {
      const errorMessage = error.message
        .substring(error.message.indexOf('/') + 1, error.message.lastIndexOf(')'))
        .replaceAll('-', ' ');
      setModalContent({
        title: MODAL_LABEL.ERROR.TITLE,
        body: errorMessage
          ? errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
          : MODAL_LABEL.ERROR.DEFAULT_BODY,
        button: MODAL_LABEL.ERROR.BUTTON,
        buttonEvent: () => setModalContent({}),
        href: undefined,
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
            <Form.Control {...FORM_FIELD.FIRST_NAME_INPUT} className='sign-up__first-name-input' required />
            <Form.Control {...FORM_FIELD.LAST_NAME_INPUT} className='sign-up__last-name-input' required />
          </div>
          <Form.Control {...FORM_FIELD.EMAIL_INPUT} className='sign-up__email-input' required />
          <Form.Control {...FORM_FIELD.PASSWORD_INPUT} className='sign-up__password-input' required />
          <Form.Control {...FORM_FIELD.DOB_INPUT} className='sign-up__dob-input' required />
          <Form.Select {...FORM_FIELD.GENDER_SELECT} className='sign-up__gender-input' required>
            {FORM_FIELD.GENDER_SELECT.options.map((gender) => (
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
      {!isEmpty(modalContent) && (
        <Modal
          buttonAttributes={{ onClick: modalContent.buttonEvent }}
          buttonLabel={modalContent.button}
          title={modalContent.title}
        >
          {modalContent.body}
        </Modal>
      )}
    </div>
  );
};

export default SignUp;
