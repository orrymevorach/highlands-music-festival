export const sendCabinReservationEmail = async ({ paymentIntentId }) => {
  const res = await fetch('/api/send-cabin-reservation-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIntentId }),
  }).then(res => res.json());
};
