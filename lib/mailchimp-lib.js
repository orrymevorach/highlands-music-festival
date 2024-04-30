export const addMemberToMailchimpAudience = async ({ emailAddress }) => {
  const res = await fetch('/api/mailchimp/add-audience-member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailAddress }),
  }).then(res => res.json());
  return res;
};
