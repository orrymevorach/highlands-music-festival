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
  const { name, email, discountCode, cabinRecordId } = req.body;

  try {
    // Get ticket records
    const ticketRecords = await base('Ticket Purchases').select().all();

    // Filter out tickets that were not purchased
    let numberOfTickets = 0;
    let numberOfCamperCabinsSold = 0;
    let numberOfHeadStaffCabinSold = 0;
    let cabinName = '';
    let numberOfConfirmedGuests = 0;
    let revenue = 0;
    for (let ticket of ticketRecords) {
      const { Cabin, Status } = ticket.fields;
      if (Status === 'Cabin Purchased') {
        const recordId = Cabin[0];
        const cabin = await getRecordById({ recordId, tableId: 'Cabins' });
        let { totalBeds } = cabin.record;

        if (cabinRecordId === cabin.record.id) {
          cabinName = cabin.record.name;
        }

        if (totalBeds === 3) {
          numberOfHeadStaffCabinSold = numberOfHeadStaffCabinSold + 1;
        } else {
          totalBeds = 12; // resetting back to 12, because private cabins technically have 24 beds --> 12 beds included in cabin price and then 12 more available for purchase
          numberOfCamperCabinsSold = numberOfCamperCabinsSold + 1;
        }
        numberOfTickets = numberOfTickets + totalBeds;

        numberOfConfirmedGuests = numberOfConfirmedGuests + 1;
        revenue = ticket.fields['Full Ticket Price']
          ? revenue + ticket.fields['Full Ticket Price']
          : revenue;
      } else if (Status === 'Ticket Purchased') {
        numberOfTickets = numberOfTickets + 1;
        numberOfConfirmedGuests = numberOfConfirmedGuests + 1;
        revenue = ticket.fields['Full Ticket Price']
          ? revenue + ticket.fields['Full Ticket Price']
          : revenue;
      } else if (Status === 'Cabin Guest') {
        numberOfConfirmedGuests = numberOfConfirmedGuests + 1;
      }
    }

    const averageTicketPrice = Math.round(revenue / numberOfTickets);
    // Number of tickets available
    const numberOfTicketsAvailable = 525;
    const remainingTickets = numberOfTicketsAvailable - numberOfTickets;

    // Create message and send as slack notification
    const channel =
      process.env.NODE_ENV === 'production'
        ? '#notifications_tickets'
        : '#testing_workflows';

    const message = `*<!channel>, a ticket to Highlands has been purchased!*\nAttendee: ${name}\nEmail: ${email}\nCabin: ${cabinName}\nDiscount Code: ${discountCode}\n\nNumber of tickets sold: ${numberOfTickets}\nRemaining Tickets: ${remainingTickets}\nCamper Cabins Sold: ${numberOfCamperCabinsSold}\nHead Staff Cabins Sold: ${numberOfHeadStaffCabinSold}\nNumber of Beds Claimed: ${numberOfConfirmedGuests}\nAverage Ticket Price: $${averageTicketPrice}`;
    await web.chat.postMessage({
      channel,
      text: message,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400).json({ error });
  }
}
