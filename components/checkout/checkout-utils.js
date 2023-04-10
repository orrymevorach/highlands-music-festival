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

const calculateInstallments = ({ total, firstInstallment }) => {
  if (!firstInstallment) return total / 4;
  return (total - firstInstallment) / 3;
};

export function calculatePricing({
  initialTicketPrice,
  priceData,
  quantity,
  promoAmount = 0,
  firstInstallment,
}) {
  const ticketPrice = Math.round(
    initialTicketPrice * 4 + priceData.discountAmount * quantity
  );
  promoAmount = promoAmount / 100; // CONVERT FROM CENTS TO DOLLARS
  const subtotal =
    ticketPrice - promoAmount - priceData.discountAmount * quantity;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const discountTotal = priceData.discountAmount * quantity;
  const installmentAmount = calculateInstallments({ total, firstInstallment });

  return {
    ...priceData,
    initialTicketPrice,
    ticketPrice,
    subtotal,
    tax,
    total,
    discountTotal,
    installmentAmount,
    promoAmount,
    firstInstallment: firstInstallment || installmentAmount,
  };
}
