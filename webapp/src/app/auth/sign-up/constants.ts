const FORM_LABEL = {
  FORM_HEADER: 'Please enter your information below',
  BACK_LINK: 'Back',
  SUBMIT_BUTTON: 'Sign Up',
} as const;

const FORM_FIELD = {
  FIRST_NAME_INPUT: {
    placeholder: 'First name',
    maxLength: 15,
    name: 'firstName',
  },
  LAST_NAME_INPUT: {
    placeholder: 'Last name',
    maxLength: 15,
    name: 'lastName',
  },
  EMAIL_INPUT: {
    placeholder: 'Email address',
    maxLength: 100,
    name: 'email',
    type: 'email',
  },
  PASSWORD_INPUT: {
    placeholder: 'Password',
    name: 'password',
    // TODO: implement password pattern
    // pattern: '',
    title:
      'Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and consist of 8 or more characters.',
    type: 'password',
  },
  DOB_INPUT: {
    placeholder: 'Date of birth',
    name: 'dob',
    type: 'date',
  },
  GENDER_SELECT: {
    placeholder: 'Gender',
    name: 'gender',
    options: ['Male', 'Female', 'Other'],
  },
} as const;

const MODAL_LABEL = {
  SUCCESS: {
    TITLE: 'Account created!',
    BODY: 'A verification link has been sent to your email.',
    BUTTON: 'Sign In',
  },
  ERROR: {
    TITLE: 'Error',
    DEFAULT_BODY: 'An error occurred.',
    BUTTON: 'Continue',
  },
} as const;

export { FORM_FIELD, FORM_LABEL, MODAL_LABEL };
