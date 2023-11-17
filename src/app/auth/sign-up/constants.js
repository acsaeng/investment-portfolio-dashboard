const FORM_LABEL = {
  FORM_HEADER: 'Please enter your information below',
  BACK_LINK: '< Back',
  SUBMIT_BUTTON: 'Sign Up',
};

const FORM_FIELD = {
  FIRST_NAME: {
    label: 'First name',
    maxLength: 15,
    name: 'firstName',
  },
  LAST_NAME: {
    label: 'Last name',
    maxLength: 15,
    name: 'lastName',
  },
  EMAIL: {
    label: 'Email address',
    maxLength: 100,
    name: 'email',
    type: 'email',
  },
  PASSWORD: {
    label: 'Password',
    name: 'password',
    // TODO: implement password pattern
    // pattern: '',
    title:
      'Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and consist of 8 or more characters.',
    type: 'password',
  },
  DOB: {
    label: 'Date of birth',
    name: 'dob',
    type: 'date',
  },
  GENDER: {
    label: 'Gender',
    name: 'gender',
    options: ['Male', 'Female', 'Other'],
  },
};

const MODAL_LABEL = {
  SUCCESS: {
    HEADER: 'Account created!',
    BODY: 'A verification link has been sent to your email.',
    BUTTON: 'Sign In',
  },
  ERROR: {
    HEADER: 'Error',
    DEFAULT_BODY: 'An error occurred.',
    BUTTON: 'Continue',
  },
};

export { FORM_FIELD, FORM_LABEL, MODAL_LABEL };
