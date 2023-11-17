'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import Loader from '@/app/components/Loader';
import { signInUser, signOutUser } from '@/api/auth';
import Modal from '@/app/components/Modal';
import PAGE from '@/utils/routes';
import CompanyLogo from '../../../img/logo.jpg';
import { FORM_FIELD, FORM_LABEL, LOGO_IMAGE_ALT, MODAL_LABEL } from './constants';
import './SignIn.scss';

const SignIn = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const router = useRouter();

  const onSignIn = async (event) => {
    setShowLoader(true);
    event.preventDefault();

    try {
      if (await signInUser(event.target.email.value, event.target.password.value)) {
        router.push(PAGE.DASHBOARD);
      }
    } catch (error) {
      setShowLoader(false);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    signOutUser();
  }, []);

  return (
    <div className='sign-in'>
      <Loader isVisible={showLoader} />
      <div className='sign-in__container'>
        <Image alt={LOGO_IMAGE_ALT} className='sign-in__logo' placeholder='blur' quality={100} src={CompanyLogo} />
        <h2 className='sign-in__title'>{FORM_LABEL.FORM_HEADER}</h2>
        <Form className='sign-in__form' onSubmit={onSignIn}>
          <Form.Control
            className='sign-in__input'
            name={FORM_FIELD.EMAIL.name}
            placeholder={FORM_FIELD.EMAIL.label}
            required
            type={FORM_FIELD.EMAIL.type}
          />
          <Form.Control
            className='sign-in__input'
            name={FORM_FIELD.PASSWORD.name}
            placeholder={FORM_FIELD.PASSWORD.label}
            required
            type={FORM_FIELD.PASSWORD.type}
          />
          <div className='sign-in__message-and-ctas-container'>
            <div className='sign-in__links-container'>
              <Link className='sign-in__account-link' href={PAGE.SIGN_UP}>
                {FORM_LABEL.SIGN_UP_LABEL}
              </Link>
              <span className='sign-in__delimiter'>·</span>
              <Link className='sign-in__account-link' href={PAGE.FORGOT_PASSWORD}>
                {FORM_LABEL.FORGOT_PASSWORD_LABEL}
              </Link>
            </div>
            <Button className='sign-in__sign-in-button' type='submit'>
              {FORM_LABEL.SUBMIT_BUTTON_LABEL}
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        buttonLabel={MODAL_LABEL.BUTTON}
        isVisible={showErrorModal}
        onButtonClick={() => setShowErrorModal(false)}
        title={MODAL_LABEL.TITLE}
      >
        {MODAL_LABEL.BODY}
      </Modal>
    </div>
  );
};

export default SignIn;
