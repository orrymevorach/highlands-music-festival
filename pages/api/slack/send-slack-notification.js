const { WebClient } = require('@slack/web-api');
const Airtable = require('airtable');
import { amountToDollar } from 'utils/utils';

require('dotenv').config({ path: '.env.local' });

// Airtable Config
var base = new Airtable({
  apiKey: AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(AIRTABLE_BASE);

// Slack Config
const web = new WebClient(process.env.SLACK_OAUTH_TOKEN);

export default async function handler(req, res) {
  const { name, email, discountCode } = req.body;

  try {
    // Get ticket records
    const ticketRecords = await base('Ticket Purchases 2024').select().all();

    // Filter out tickets that were not purchased
    const recordsFilteredByTicketStatus = ticketRecords.filter(record => {
      if (record?.fields?.Status === 'Ticket Purchased') return true;
      return false;
    });

    // Count number of tickets
    const numberOfTickets = recordsFilteredByTicketStatus.length;

    // Create message and send as slack notification
    const message = `*<!channel>, a ticket to Highlands has been purchased!*\nAttendee: ${name}\nEmail: ${email}\nDiscount Code: ${discountCode}\n\nNumber of tickets sold: ${numberOfTickets}`;
    await web.chat.postMessage({
      channel: '#notifications_tickets',
      text: message,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400).json({ error });
  }
}
