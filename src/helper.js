// Helper function that does not involve rendering only calulation logics.
export const fulfillStatus = function(orders) {
  const total = orders.reduce(function(previousValue, currentValue) {
    return {
      subTotal: previousValue.subTotal + currentValue.subTotal,
    };
  });
  console.log(total);
};

export const currencyFormat = value =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
