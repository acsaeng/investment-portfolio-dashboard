const LOGO_IMAGE_ALT = "Company logo";

const FORM_LABEL = {
  FORM_HEADER: "Enter your email address below",
  BACK_LABEL: "Back",
  SUBMIT_LABEL: "Submit",
} as const;

const EMAIL_FORM_FIELD = {
  maxLength: 100,
  name: "email",
  placeholder: "Email address",
  type: "email",
} as const;

const MODAL_LABEL = {
  TITLE: "Confirmation email sent",
  BODY: "A recovery link has been sent to your email.",
  BUTTON: "Sign In",
} as const;

export { EMAIL_FORM_FIELD, FORM_LABEL, LOGO_IMAGE_ALT, MODAL_LABEL };
