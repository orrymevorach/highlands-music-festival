export async function sendSlackNotification({
  name,
  email,
  discountCode,
  cabinRecordId,
}) {
  const response = await fetch('/api/slack/send-slack-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, discountCode, cabinRecordId }),
  }).then(res => res.json());
  return response;
}
