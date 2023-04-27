const mapIndexToMonth = {
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

export const getMonth = ({ subscriptionStartDate, iteration = 0 }) => {
  const [_, monthIndex] = subscriptionStartDate.split('-');
  return mapIndexToMonth[parseInt(monthIndex) + iteration];
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
  const ticketPrice = Math.round(
    priceData.firstInstalmentPerUnitBeforeTax * 4 * quantity
  );
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
