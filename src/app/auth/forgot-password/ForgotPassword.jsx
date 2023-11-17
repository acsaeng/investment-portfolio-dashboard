'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import Loader from '@/app/components/Loader';
import Modal from '@/app/components/Modal';
import { resetPassword, signOutUser } from '@/api/auth';
import PAGE from '@/utils/routes';
import CompanyLogo from '../../../img/logo.jpg';
import { EMAIL_FORM_FIELD, FORM_LABEL, LOGO_IMAGE_ALT, MODAL_LABEL } from './constants';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    setShowLoader(true);
    event.preventDefault();
    await resetPassword(event.target.email.value);
    setShowSuccessModal(true);
    setShowLoader(false);
  };

  useEffect(() => {
    signOutUser();
  }, []);

  return (
    <div className='forgot-password'>
      <Loader isVisible={showLoader} />
      <div className='forgot-password__container'>
        <Link className='forgot-password__back-button' href={PAGE.SIGN_IN}>
          {FORM_LABEL.BACK_LABEL}
        </Link>
        <Image
          alt={LOGO_IMAGE_ALT}
          className='forgot-password__logo'
          placeholder='blur'
          quality={100}
          src={CompanyLogo}
        />
        <h6 className='forgot-password__header'>{FORM_LABEL.FORM_HEADER}</h6>
        <Form className='forgot-password__form' onSubmit={onSubmit}>
          <Form.Control
            className='forgot-password__email-input'
            maxLength={EMAIL_FORM_FIELD.maxLength}
            name={EMAIL_FORM_FIELD.name}
            placeholder={EMAIL_FORM_FIELD.label}
            required
            type={EMAIL_FORM_FIELD.type}
          />
          <Button className='forgot-password__submit-button' type='submit'>
            {FORM_LABEL.SUBMIT_LABEL}
          </Button>
        </Form>
      </div>
      <Modal
        buttonLabel={MODAL_LABEL.BUTTON}
        header={MODAL_LABEL.HEADER}
        isVisible={showSuccessModal}
        onButtonClick={() => router.push(PAGE.SIGN_IN)}
      >
        {MODAL_LABEL.BODY}
      </Modal>
    </div>
  );
};

export default ForgotPassword;
