'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Form, Modal } from 'react-bootstrap';
import Loader from '@/app/components/Loader';
import { resetPassword } from '@/api/auth';
import PAGE from '@/utils/routes';
import CompanyLogo from '../../../img/logo.jpg';
import { EMAIL_FORM_FIELDS, FORM_LABELS, LOGO_IMAGE_ALT, MODAL_LABELS } from './constants';

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
          {FORM_LABELS.BACK_LABEL}
        </Link>
        <Image
          alt={LOGO_IMAGE_ALT}
          className='forgot-password__logo'
          placeholder='blur'
          quality={100}
          src={CompanyLogo}
        />
        <h6 className='forgot-password__header'>{FORM_LABELS.FORM_HEADER}</h6>
        <Form className='forgot-password__form' onSubmit={onSubmit}>
          <Form.Control
            className='forgot-password__email-input'
            maxLength={EMAIL_FORM_FIELDS.maxLength}
            name={EMAIL_FORM_FIELDS.name}
            placeholder={EMAIL_FORM_FIELDS.label}
            required
            type={EMAIL_FORM_FIELDS.type}
          />
          <Button className='forgot-password__submit-button' type='submit'>
            {FORM_LABELS.SUBMIT_LABEL}
          </Button>
        </Form>
      </div>
      <Modal backdrop='static' className='forgot-password__confirmation-modal' centered show={showSuccessModal}>
        <Modal.Header>
          <Modal.Title>{MODAL_LABELS.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{MODAL_LABELS.BODY}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => router.push(PAGE.SIGN_IN)}>{MODAL_LABELS.BUTTON}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
