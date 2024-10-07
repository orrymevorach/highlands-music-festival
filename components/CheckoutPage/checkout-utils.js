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

export const getMonth = ({ subscriptionStartDate, iteration = 0 }) => {
  let [_, monthIndex] = subscriptionStartDate.split('-');
  let monthInNumbers = parseInt(monthIndex) + iteration;
  if (monthInNumbers > 12) monthInNumbers = 1;
  return mapIndexToMonth[monthInNumbers];
};

const getInstallmentData = ({ priceData, promoPaymentIntent, quantity }) => {
  if (promoPaymentIntent)
    return {
      // the calculation for the first instalment happens in apply-promo-code
      firstInstalmentTotalAfterTax: promoPaymentIntent.amount / 100,
    };

  return {
    firstInstalmentTotalAfterTax:
      priceData.firstInstalmentTotalAfterTax * quantity, // This field only applies to subscription flow, it is empty if on single payment flow
    subscriptionInstallmentAmount:
      priceData.firstInstalmentTotalAfterTax * quantity,
  };
};

export function calculatePricing({
  priceData,
  quantity = 1,
  promoAmount = 0,
  promoPaymentIntent,
}) {
  const ticketPrice = Math.round(priceData.price * quantity);
  const subtotal =
    ticketPrice - promoAmount - priceData.discountAmountPerUnit * quantity;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const discountTotal = priceData.discountAmountPerUnit * quantity;

  // Only changes if there is a promo
  const installmentData = getInstallmentData({
    priceData,
    promoPaymentIntent,
    quantity,
  });

  return {
    ...priceData,
    ticketPrice,
    subtotal,
    tax,
    total,
    discountTotal,
    promoAmount,
    ...installmentData,
  };
}
