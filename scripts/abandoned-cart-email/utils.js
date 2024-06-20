const Airtable = require('airtable');
let nodemailer = require('nodemailer');

require('dotenv').config({ path: '.env.local' });

var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

async function getRecords(tableId) {
  const recordsArray = [];
  await airtableBase(tableId)
    .select()
    .eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        record.fields.id = record.getId();
        recordsArray.push(record.fields);
      });
      fetchNextPage();
    });
  return recordsArray;
}

async function updateTicketPurchaseStatus({
  marketingContacts,
  ticketPurchasers,
}) {
  // Create an array of email addresses from ticketPurchasers
  const ticketPurchasersEmailAddresses = new Set(
    ticketPurchasers.map(obj => obj['Email Address'])
  );

  // Loop through marketingContacts, if they exist in Ticket Purchasers, update "Has Ticket" to true.
  let contactsWithUpdatedStatus = [];

  for (let contact of marketingContacts) {
    if (
      ticketPurchasersEmailAddresses.has(contact['Email Address']) &&
      contact['Has Ticket'] === 'False'
    ) {
      try {
        // Update "Has Ticket" field in airtable
        await airtableBase('Marketing').update(contact.id, {
          'Has Ticket': 'True',
          'Abandoned Cart Email': 'Cancelled',
        });
        // update local copy so that we can filter it out in the next step
        contact['Has Ticket'] = 'True';
      } catch (err) {
        console.log('error', err);
      }
    }
    contactsWithUpdatedStatus.push(contact);
  }
  return contactsWithUpdatedStatus;
}

async function sendAbandonedCartEmail({ contact }) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
    to: contact['Email Address'],
    subject:
      "Don't Miss Out! Your Highlands Music Festival Tickets are Waiting 🎵",
    html: `
      <div style="font-size:14px;">
        <p>Hi ${contact.Name}!</p>
        <p>We noticed you were about to get your tickets to Highlands Music Festival but didn't complete your purchase. Tickets are selling fast, and we don't want you to miss out on the incredible lineup and unforgettable experience!</p>
        <p>Why you should attend:</p>
        <ul style="list-style:none;padding:0;">
            <li style="padding:7px 0;"><a href="https://highlandsmusicfestival.ca/lineup-and-schedule">🌟 Amazing Lineup:</a> Headlined by Kevin Morby, Donovan Woods, and Wing Night, plus over 15 more artists!</li>
            <li style="padding:7px 0;"><a href="https://highlandsmusicfestival.ca/activities">🎉 Camp Activities:</a> Swim, yoga, waterski, marketplace, pickleball, get a tattoo ... you name it, we have it.</li>
            <li style="padding:7px 0;">📅 Food & Accommodations Included: Sleeping in a cabin with all your friends, and 3 meals plus snacks all included in the ticket price!</li>
        </ul>
        <p><a href="https://www.highlandsmusicfestival.ca/buy-tickets">Click here</a> to resume your purchase.</p>
        <p>If you have any questions or need assistance, our support team is here to help. Contact us at support@highlandsmusicfestival.ca.</p>
        <p>See you at Highlands!</p>
        <p><em>Please do not reply to this email.</em></p>
        <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min-small.0900c997.png&w=2048&q=75" style="width:300px;margin: 20px 0;" }} />
        <p style="font-size:12px;">We really do our best not to spam your inbox, but if you want to opt out of any future promotional emails, <a href="https://highlandsmusicfestival.ca/api/airtable/unsubscribe?id=${contact.id}">click here</a> to unsubscribe.</p>
      </div>
      `,
  });
  console.log(`email sent to ${contact['Email Address']}`);
}

async function removeDuplicateContacts({ array }) {
  const seenEmails = [];
  const noDupes = [];

  for (let contact of array) {
    if (!seenEmails.includes(contact['Email Address'])) {
      seenEmails.push(contact['Email Address']);
      noDupes.push(contact);
    } else {
      await airtableBase('Marketing').destroy(contact.id);
    }
  }
  return noDupes;
}

module.exports = {
  getRecords,
  updateTicketPurchaseStatus,
  sendAbandonedCartEmail,
  removeDuplicateContacts,
};
