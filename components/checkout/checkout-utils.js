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

export function calculatePricing({ initialTicketPrice, priceData, quantity }) {
  const ticketPrice = Math.round(
    initialTicketPrice * 4 + priceData.discountAmount * quantity
  );
  const subtotal = ticketPrice - priceData.discountAmount * quantity;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const discountTotal = priceData.discountAmount * quantity;
  const installmentAmount = total / 4;

  return {
    ticketPrice,
    subtotal,
    tax,
    total,
    discountTotal,
    installmentAmount,
  };
}
