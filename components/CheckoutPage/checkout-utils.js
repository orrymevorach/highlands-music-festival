export const mapIndexToMonth = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const mapDayToSuffix = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  4: 'th',
  5: 'th',
  6: 'th',
  7: 'th',
  8: 'th',
  9: 'th',
  10: 'th',
  11: 'th',
  12: 'th',
  13: 'th',
  14: 'th',
  15: 'th',
  16: 'th',
  17: 'th',
  18: 'th',
  19: 'th',
  20: 'th',
  21: 'st',
  22: 'nd',
  23: 'rd',
  24: 'th',
  25: 'th',
  26: 'th',
  27: 'th',
  28: 'th',
  29: 'th',
  30: 'th',
  31: 'st',
};

export const getInstallmentDate = ({ iteration = 0 }) => {
  const today = new Date().toISOString().split('T')[0];
  let [year, monthIndex, day] = today.split('-');
  let monthInNumbers = parseInt(monthIndex) + iteration;
  if (monthInNumbers > 12) monthInNumbers = monthInNumbers - 12;
  const month = mapIndexToMonth[monthInNumbers];
  return {
    month,
    day,
    year,
  };
};

export function calculatePricing({
  priceData,
  quantity = 1,
  promoAmount = 0,
  promoPaymentIntent,
}) {
  const excludeTax = priceData.excludeTax === 'True';
  const discountAmountPerUnit = priceData.discountAmountPerUnit || 0;
  const ticketPrice = Math.round(priceData.price * quantity * 100) / 100; // Round to 2 decimal places
  const subtotal = ticketPrice - promoAmount - discountAmountPerUnit * quantity;

  const tax = excludeTax ? null : subtotal * 0.13;
  const total = excludeTax ? subtotal : subtotal + tax;
  const discountTotal = discountAmountPerUnit * quantity;

  return {
    ...priceData,
    ticketPrice,
    subtotal,
    tax,
    total,
    discountTotal,
    promoAmount,
  };
}

export const createTemporaryPassword = word => {
  const array = word.split('_');
  const lastWord = array[array.length - 1];
  return `hmf_${lastWord}`;
};

export const getDefaultSubscriptionData = pricing => {
  const defaultSubscriptionOption = pricing.subscriptionOptions?.length
    ? pricing.subscriptionOptions[0]
    : null;

  if (!defaultSubscriptionOption) {
    return {
      subscriptionInstallmentAmount: '',
      subscriptionId: '',
      numberOfSubscriptionIterations: 0,
      recordId: '',
    };
  }

  return {
    subscriptionInstallmentAmount: defaultSubscriptionOption?.price,
    subscriptionId: defaultSubscriptionOption?.subscriptionId,
    numberOfSubscriptionIterations: parseFloat(
      defaultSubscriptionOption?.numberOfSubscriptionIterations
    ),
    recordId: defaultSubscriptionOption?.id,
  };
};
