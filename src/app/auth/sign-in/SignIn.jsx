'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form, Modal } from 'react-bootstrap';
import { signInUser, signOutUser } from '@/utils/auth';
import PAGE from '@/common/routes';
import CompanyLogo from '../../../img/logo.jpg';
import { FORM_FIELDS, FORM_LABELS, LOGO_IMAGE_ALT, MODAL_LABELS } from './constants';

import './SignIn.scss';
import Loader from '@/app/components/Loader/Loader';

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
        <h2 className='sign-in__title'>{FORM_LABELS.FORM_HEADER}</h2>
        <Form className='sign-in__form' onSubmit={onSignIn}>
          <Form.Control
            className='sign-in__input'
            name={FORM_FIELDS.EMAIL.name}
            placeholder={FORM_FIELDS.EMAIL.label}
            required
            type={FORM_FIELDS.EMAIL.type}
          />
          <Form.Control
            className='sign-in__input'
            name={FORM_FIELDS.PASSWORD.name}
            placeholder={FORM_FIELDS.PASSWORD.label}
            required
            type={FORM_FIELDS.PASSWORD.type}
          />
          <div className='sign-in__message-and-ctas-container'>
            <div className='sign-in__links-container'>
              <Link className='sign-in__account-link' href={PAGE.SIGN_UP}>
                {FORM_LABELS.SIGN_UP_LABEL}
              </Link>
              <span className='sign-in__delimiter'>·</span>
              <Link className='sign-in__account-link' href={PAGE.FORGOT_PASSWORD}>
                {FORM_LABELS.FORGOT_PASSWORD_LABEL}
              </Link>
            </div>
            <Button className='sign-in__sign-in-button' type='submit'>
              {FORM_LABELS.SUBMIT_BUTTON_LABEL}
            </Button>
          </div>
        </Form>
      </div>
      <Modal backdrop='static' className='sign-in__error-modal' centered show={showErrorModal}>
        <Modal.Header>
          <Modal.Title>{MODAL_LABELS.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{MODAL_LABELS.BODY}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowErrorModal(false)}>{MODAL_LABELS.BUTTON}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignIn;
