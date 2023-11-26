const DASHBOARD_HEADER_FIELD = {
  gainLabel: 'gain',
  lossLabel: 'loss',
};

const TABLE_FIELD = {
  TITLE: 'Your portfolio',
  HEADER: {
    symbol: '',
    assetPrice: 'Current price',
    totalValue: 'Total value',
    return: 'All time return',
    actions: '',
  },
  ITEM_LABEL: {
    shareSuffix: 'share',
    sharesSuffix: 'shares',
  },
  BUTTON_LABEL: {
    addAsset: 'Add asset',
  },
  NO_DATA_RESPONSE: 'No data to show',
};

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
  BUY_OR_SELL_ASSET: {
    FORM: {
      action: 'buy-or-sell-asset',
      title: 'Buy/sell asset',
      buttonLabel: 'Confirm',
    },
    SUCCESS_RESPONSE: {
      title: 'Success!',
      body: 'The asset has been updated in your portfolio.',
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

const ASSET_FORM_FIELD = {
  BUY_OR_SELL: {
    buyLabel: 'Buy',
    buyValue: 'buy',
    name: 'buyOrSell',
    sellLabel: 'Sell',
    sellValue: 'sell',
    type: 'radio',
  },
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

export { ASSET_FORM_FIELD, DASHBOARD_HEADER_FIELD, MODAL_CONTENT, TABLE_FIELD };
