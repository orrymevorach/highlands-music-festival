export async function sendSlackNotification({ name, email, discountCode }) {
  const response = await fetch('/api/slack/send-slack-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, discountCode }),
  }).then(res => res.json());
  return response;
}
