export const FORM_FIELDS = {
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

export const FORM_LABELS = {
  FORM_HEADER: 'Please enter your information below',
  BACK_LINK: '< Back',
  SUBMIT_BUTTON: 'Sign Up',
};

export const MODAL_LABELS = {
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
};
