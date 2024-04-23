const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config({ path: '.env.local' });

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us8',
});

const mailchimpListId = 'e38b9edce5';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { emailAddress } = req.body;
      const response = await mailchimp.lists.addListMember(mailchimpListId, {
        email_address: emailAddress,
        status: 'pending',
      });
      res.status(200).json({ response });
    } catch (err) {
      res.status(err.statusCode || 500).json(err);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
