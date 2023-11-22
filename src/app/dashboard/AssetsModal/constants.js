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

export { ASSET_FORM_FIELD };
