const formatCurrency = (value) => {
  return `${value > 0 ? '' : '-'}$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const formatPercentage = (value) => {
  return `${value > 0 ? '' : '-'}${value.toFixed(2)}%`;
};

export { formatCurrency, formatPercentage };
