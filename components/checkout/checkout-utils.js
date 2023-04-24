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

const getFirstInstallment = ({ priceData, promoPaymentIntent }) => {
  if (promoPaymentIntent) return promoPaymentIntent.amount / 100; // the calculation for the first instalment happens in apply-promo-code
  return priceData.firstInstalmentTotalAfterTax;
};

export function calculatePricing({
  priceData,
  quantity,
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
  const firstInstalmentTotalAfterTax = getFirstInstallment({
    priceData,
    promoPaymentIntent,
  });

  return {
    ...priceData,
    ticketPrice,
    subtotal,
    tax,
    total,
    discountTotal,
    promoAmount,
    firstInstalmentTotalAfterTax,
  };
}
