"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { Button, Form } from "react-bootstrap";
import Loader from "@/app/components/Loader/Loader";
import Modal from "@/app/components/Modal";
import { signOutUser, signUpUser } from "@/api/auth";
import { Gender } from "@/api/users";
import PAGE from "@/utils/routes";
import { FORM_FIELD, FORM_LABEL, MODAL_LABEL } from "./constants";
import "./SignUp.scss";

interface SignUpModalContent {
  title?: string;
  body?: string;
  button?: string;
  buttonEvent?: () => void;
  href?: string;
}

const SignUp: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [modalContent, setModalContent] = useState<SignUpModalContent>({});
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoader(true);

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const dob = formData.get("dob") as string;
    const gender = formData.get("gender") as Gender;

    try {
      await signUpUser(firstName, lastName, email, password, dob, gender);
      setModalContent({
        title: MODAL_LABEL.SUCCESS.TITLE,
        body: MODAL_LABEL.SUCCESS.BODY,
        button: MODAL_LABEL.SUCCESS.BUTTON,
        buttonEvent: () => router.push(PAGE.SIGN_IN),
      });
    } catch (error: any) {
      const errorMessage = error.message
        .substring(
          error.message.indexOf("/") + 1,
          error.message.lastIndexOf(")")
        )
        .replaceAll("-", " ");

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
    <div className="sign-up">
      <Loader isVisible={showLoader} />
      <div className="container">
        <Link className="back-button" href={PAGE.SIGN_IN}>
          {FORM_LABEL.BACK_LINK}
        </Link>
        <h6 className="header">{FORM_LABEL.FORM_HEADER}</h6>
        <Form className="form" onSubmit={onSubmit}>
          <div className="name-inputs-container">
            <Form.Control
              {...FORM_FIELD.FIRST_NAME_INPUT}
              className="first-name-input"
              required
            />
            <Form.Control
              {...FORM_FIELD.LAST_NAME_INPUT}
              className="last-name-input"
              required
            />
          </div>
          <Form.Control
            {...FORM_FIELD.EMAIL_INPUT}
            className="email-input"
            required
          />
          <Form.Control
            {...FORM_FIELD.PASSWORD_INPUT}
            className="password-input"
            required
          />
          <Form.Control
            {...FORM_FIELD.DOB_INPUT}
            className="dob-input"
            required
          />
          <Form.Select
            {...FORM_FIELD.GENDER_SELECT}
            className="gender-input"
            required
          >
            {FORM_FIELD.GENDER_SELECT.options.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Form.Select>
          <Button className="submit-button" type="submit">
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
