export const sendCabinReservationEmail = async ({
  temporaryPassword,
  emailAddress,
}) => {
  const res = await fetch('/api/mailgun/send-cabin-reservation-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ temporaryPassword, emailAddress }),
  }).then(res => res.json());
  return res;
};

export const sendConfirmationEmail = async ({ emailAddress }) => {
  const res = await fetch('/api/mailgun/send-confirmation-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailAddress }),
  }).then(res => res.json());
  return res;
};

export const sendArtistSubmissionForm = async ({ fields }) => {
  const res = await fetch('/api/mailgun/send-artist-submission-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  }).then(res => res.json());
  return res;
};

export const sendVendorSubmissionForm = async ({ fields }) => {
  const res = await fetch('/api/mailgun/send-vendor-submission-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  }).then(res => res.json());
  return res;
};
