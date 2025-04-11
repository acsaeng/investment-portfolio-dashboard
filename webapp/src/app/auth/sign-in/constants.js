const LOGO_IMAGE_ALT = 'Company logo';

const FORM_LABEL = {
  FORM_HEADER: 'Sign In',
  SIGN_UP_LABEL: 'Sign up',
  FORGOT_PASSWORD_LABEL: 'Forgot password?',
  SUBMIT_BUTTON_LABEL: 'Sign In',
};

const FORM_FIELD = {
  EMAIL_INPUT: {
    maxLength: 100,
    name: 'email',
    placeholder: 'Email address',
    type: 'email',
  },
  PASSWORD_INPUT: {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
};

const MODAL_LABEL = {
  TITLE: 'Error',
  BODY: 'The email address or password is invalid',
  BUTTON: 'Continue',
};

export { FORM_FIELD, FORM_LABEL, LOGO_IMAGE_ALT, MODAL_LABEL };
