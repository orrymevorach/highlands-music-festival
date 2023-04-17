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

const calculateInstallments = ({ total, firstInstalmentTotalAfterTax }) => {
  if (!firstInstalmentTotalAfterTax) return total / 4;
  return (total - firstInstalmentTotalAfterTax) / 3;
};

const getTicketPrice = ({ priceData, ticketPrice, quantity }) => {
  if (!ticketPrice) return priceData.ticketPrice;
  return Math.round(
    ticketPrice * 4 + priceData.discountAmountPerUnit * quantity
  );
};

export function calculatePricing({
  ticketPrice,
  priceData,
  quantity,
  promoAmount = 0,
  firstInstalmentTotalAfterTax,
}) {
  ticketPrice = getTicketPrice({ priceData, ticketPrice, quantity });
  promoAmount = promoAmount / 100; // CONVERT FROM CENTS TO DOLLARS
  const subtotal =
    ticketPrice - promoAmount - priceData.discountAmountPerUnit * quantity;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const discountTotal = priceData.discountAmountPerUnit * quantity;
  const subscriptionInstallmentAmount = calculateInstallments({
    total,
    firstInstalmentTotalAfterTax,
  });

  return {
    ...priceData,
    ticketPrice,
    subtotal,
    tax,
    total,
    discountTotal,
    subscriptionInstallmentAmount,
    promoAmount,
    firstInstalmentTotalAfterTax:
      firstInstalmentTotalAfterTax || subscriptionInstallmentAmount,
  };
}
