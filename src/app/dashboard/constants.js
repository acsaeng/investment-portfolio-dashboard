const USER_ACTION = {
  ADD_NEW_ASSET: 'add-new-asset',
};

const MODAL_CONTENT = {
  ADD_NEW_ASSET: {
    FORM: {
      title: 'Add new asset',
      buttonLabel: 'Add',
    },
    SUCCESS_RESPONSE: {
      title: 'Success!',
      body: 'The asset has been added to your portfolio.',
      buttonLabel: 'Done',
    },
    ERROR_RESPONSE: {
      title: 'Error',
      buttonLabel: 'Continue',
    },
  },
};

export { MODAL_CONTENT, USER_ACTION };
