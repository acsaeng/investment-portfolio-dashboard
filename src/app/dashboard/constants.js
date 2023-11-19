const MODAL_CONTENT = {
  ADD_ASSET: {
    FORM: {
      action: 'add-asset',
      title: 'Add new asset',
      buttonLabel: 'Add',
    },
    SUCCESS_RESPONSE: {
      title: 'Success!',
      body: 'The asset has been added to your portfolio.',
      buttonLabel: 'Done',
    },
  },
  DELETE_ASSET: {
    FORM: {
      action: 'delete-asset',
      title: 'Delete asset',
      body: "Click 'Confirm' if you wish to delete this asset",
      buttonLabel: 'Confirm',
    },
    SUCCESS_RESPONSE: {
      title: 'Success!',
      body: 'The asset has been deleted from your portfolio.',
      buttonLabel: 'Done',
    },
  },
  ERROR_RESPONSE: {
    title: 'Error',
    buttonLabel: 'Continue',
  },
};

export { MODAL_CONTENT };
