const DASHBOARD_HEADER_FIELD = {
  gainLabel: "gain",
  lossLabel: "loss",
} as const;

const TABLE_FIELD = {
  TITLE: "Your portfolio",
  HEADER: {
    symbol: "",
    holdingPrice: "Current price",
    totalValue: "Total value",
    return: "All time return",
    actions: "",
  },
  ITEM_LABEL: {
    shareSuffix: "share",
    sharesSuffix: "shares",
  },
  BUTTON_LABEL: {
    addHolding: "Add holding",
  },
  NO_DATA_RESPONSE: "No data to show",
} as const;

const MODAL_CONTENT = {
  ADD_HOLDING: {
    FORM: {
      action: "add-holding",
      title: "Add new holding",
      buttonLabel: "Add",
    },
    SUCCESS_RESPONSE: {
      title: "Success!",
      body: "The holding has been added to your portfolio.",
      buttonLabel: "Done",
    },
  },
  UPDATE_HOLDING: {
    FORM: {
      action: "update-holding",
      title: "Buy/sell holding",
      buttonLabel: "Confirm",
    },
    SUCCESS_RESPONSE: {
      title: "Success!",
      body: "The holding has been updated in your portfolio.",
      buttonLabel: "Done",
    },
  },
  DELETE_HOLDING: {
    FORM: {
      action: "delete-holding",
      title: "Delete holding",
      body: "Click 'Confirm' if you wish to delete this holding",
      buttonLabel: "Confirm",
    },
    SUCCESS_RESPONSE: {
      title: "Success!",
      body: "The holding has been deleted from your portfolio.",
      buttonLabel: "Done",
    },
  },
  ERROR_RESPONSE: {
    title: "Error",
    body: "Sorry, this holding could not be added.",
    buttonLabel: "Continue",
  },
} as const;

const HOLDING_FORM_FIELD = {
  BUY_RADIO_BUTTON: {
    label: "Buy",
    name: "action",
    value: "buy",
    type: "radio" as const,
  },
  SELL_RADIO_BUTTON: {
    label: "Sell",
    name: "action",
    value: "sell",
    type: "radio" as const,
  },
  SYMBOL_INPUT: {
    maxLength: 6,
    name: "symbol",
    placeholder: "Symbol",
  },
  NUM_SHARES_INPUT: {
    min: 0,
    name: "numShares",
    placeholder: "Number of shares",
    suffix: "shares",
    type: "number",
  },
  PRICE_PER_SHARE_INPUT: {
    maxLength: 9,
    min: 0,
    name: "pricePerShare",
    placeholder: "Price per share",
    prefix: "$",
    step: "0.01",
    type: "number",
  },
} as const;

export {
  HOLDING_FORM_FIELD,
  DASHBOARD_HEADER_FIELD,
  MODAL_CONTENT,
  TABLE_FIELD,
};
