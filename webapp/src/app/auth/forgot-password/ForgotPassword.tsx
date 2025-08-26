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

const ForgotPassword: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoader(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    await resetPassword(email);
    
    setShowSuccessModal(true);
    setShowLoader(false);
  };

  useEffect(() => {
    signOutUser();
  }, []);

  return (
    <div className="forgot-password">
      <Loader isVisible={showLoader} />
      <div className="container">
        <Link className="back-button" href={PAGE.SIGN_IN}>
          {FORM_LABEL.BACK_LABEL}
        </Link>
        <Image
          alt={LOGO_IMAGE_ALT}
          className="logo"
          placeholder="blur"
          quality={100}
          src={CompanyLogo}
        />
        <h6 className="header">{FORM_LABEL.FORM_HEADER}</h6>
        <Form className="form" onSubmit={onSubmit}>
          <Form.Control {...EMAIL_FORM_FIELD} className="email-input" required />
          <Button className="submit-button" type="submit">
            {FORM_LABEL.SUBMIT_LABEL}
          </Button>
        </Form>
      </div>
      <Modal
        buttonAttributes={{ onClick: () => router.push(PAGE.SIGN_IN) }}
        buttonLabel={MODAL_LABEL.BUTTON}
        isVisible={showSuccessModal}
        title={MODAL_LABEL.TITLE}
      >
        {MODAL_LABEL.BODY}
      </Modal>
    </div>
  );
};

export default ForgotPassword;
