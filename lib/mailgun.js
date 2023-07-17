export const sendCabinReservationEmail = async ({
  paymentIntentId,
  emailAddress,
}) => {
  const res = await fetch('/api/send-cabin-reservation-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIntentId, emailAddress }),
  }).then(res => res.json());
};
