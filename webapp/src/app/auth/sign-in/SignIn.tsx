"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import Loader from "@/app/components/Loader";
import { signInUser, signOutUser } from "@/api/auth";
import Modal from "@/app/components/Modal";
import PAGE from "@/utils/routes";
import CompanyLogo from "../../../img/logo.jpg";
import {
  FORM_FIELD,
  FORM_LABEL,
  LOGO_IMAGE_ALT,
  MODAL_LABEL,
} from "./constants";
import "./SignIn.scss";

const SignIn: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const router = useRouter();

  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoader(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (await signInUser(email, password)) {
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
    <div className="sign-in">
      <Loader isVisible={showLoader} />
      <div className="container">
        <Image
          alt={LOGO_IMAGE_ALT}
          className="logo"
          placeholder="blur"
          quality={100}
          src={CompanyLogo}
        />
        <h2 className="title">{FORM_LABEL.FORM_HEADER}</h2>
        <Form className="form" onSubmit={onSignIn}>
          <Form.Control
            {...FORM_FIELD.EMAIL_INPUT}
            className="input"
            required
          />
          <Form.Control
            {...FORM_FIELD.PASSWORD_INPUT}
            className="input"
            required
          />
          <div className="message-and-ctas-container">
            <div className="links-container">
              <Link className="account-link" href={PAGE.SIGN_UP}>
                {FORM_LABEL.SIGN_UP_LABEL}
              </Link>
              <span className="delimiter">·</span>
              <Link className="account-link" href={PAGE.FORGOT_PASSWORD}>
                {FORM_LABEL.FORGOT_PASSWORD_LABEL}
              </Link>
            </div>
            <Button className="sign-in-button" type="submit">
              {FORM_LABEL.SUBMIT_BUTTON_LABEL}
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        buttonAttributes={{ onClick: () => setShowErrorModal(false) }}
        buttonLabel={MODAL_LABEL.BUTTON}
        isVisible={showErrorModal}
        title={MODAL_LABEL.TITLE}
      >
        {MODAL_LABEL.BODY}
      </Modal>
    </div>
  );
};

export default SignIn;
