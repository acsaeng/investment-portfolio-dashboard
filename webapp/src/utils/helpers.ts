const formatCurrency = (value: number): string => {
  if (value > 0) {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else {
    return `-$${value
      .toFixed(2)
      .substring(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export { formatCurrency, formatPercentage };
