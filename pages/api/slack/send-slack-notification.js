import { getRecordById } from 'lib/airtable-lib';

const { WebClient } = require('@slack/web-api');
const Airtable = require('airtable');

require('dotenv').config({ path: '.env.local' });

// Airtable Config
var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

// Slack Config
const web = new WebClient(process.env.SLACK_OAUTH_TOKEN);

export default async function handler(req, res) {
  const { name, email, discountCode } = req.body;

  try {
    // Get ticket records
    const ticketRecords = await base('Ticket Purchases').select().all();

    // Filter out tickets that were not purchased
    let numberOfTickets = 0;
    let numberOfCamperCabinsSold = 0;
    let numberOfHeadStaffCabinSold = 0;
    let cabinName = '';

    for (let ticket of ticketRecords) {
      const { Cabin, Status } = ticket.fields;
      if (Status === 'Ticket Purchased' && Cabin) {
        const recordId = Cabin[0];
        const cabin = await getRecordById({ recordId, tableId: 'Cabins' });
        const { totalBeds } = cabin.record;

        numberOfTickets = numberOfTickets + totalBeds;
        if (ticket.id === cabin.record.id) {
          cabinName = cabin.record.name;
        }

        if (totalBeds === 12) {
          numberOfCamperCabinsSold = numberOfCamperCabinsSold + 1;
        }
        if (totalBeds === 3) {
          numberOfHeadStaffCabinSold = numberOfHeadStaffCabinSold + 1;
        }
      } else if (Status === 'Ticket Purchased') {
        numberOfTickets = numberOfTickets + 1;
      }
    }
    // Number of tickets available
    const numberOfTicketsAvailable = 525;
    const remainingTickets = numberOfTicketsAvailable - numberOfTickets;

    // Create message and send as slack notification
    const message = `*<!channel>, a ticket to Highlands has been purchased!*\nAttendee: ${name}\nEmail: ${email}\nCabin: ${cabinName}\nDiscount Code: ${discountCode}\n\nNumber of tickets sold: ${numberOfTickets}\nRemaining Tickets: ${remainingTickets}\nCamper Cabins Sold: ${numberOfCamperCabinsSold}\nHead Staff Cabins Sold: ${numberOfHeadStaffCabinSold}`;
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
