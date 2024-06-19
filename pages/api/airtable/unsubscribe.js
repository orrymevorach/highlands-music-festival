const Airtable = require('airtable');

require('dotenv').config({ path: '.env.local' });

// // Airtable Config
var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  const { id } = req.query;

  await airtableBase('Marketing').update(id, {
    Status: 'Unsubscribed',
  });
  // Redirect to airtable record
  res.redirect(307, 'https://highlandsmusicfestival.ca/unsubscribe');
}
