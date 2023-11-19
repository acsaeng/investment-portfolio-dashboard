const TABLE_TITLE = 'Your portfolio';
const ADD_NEW_ASSET_BUTTON_LABEL = 'Add new asset';

const TABLE_HEADER = {
  symbol: '',
  assetPrice: 'Current price',
  totalValue: 'Total value',
  return: 'All time return',
};

const NO_DATA_RESPONSE = 'No data to show';

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

const ASSET_FORM_FIELD = {
  SYMBOL: {
    label: 'Symbol',
    maxLength: 4,
    name: 'symbol',
  },
  NUM_SHARES: {
    label: 'Number of shares',
    min: 0,
    name: 'numShares',
    type: 'number',
  },
  PRICE_PER_SHARE: {
    label: 'Price per share',
    maxLength: 9,
    min: 0,
    name: 'pricePerShare',
    step: '0.01',
    type: 'number',
  },
};

export {
  ADD_NEW_ASSET_BUTTON_LABEL,
  ASSET_FORM_FIELD,
  MODAL_CONTENT,
  NO_DATA_RESPONSE,
  TABLE_HEADER,
  TABLE_TITLE,
  USER_ACTION,
};
