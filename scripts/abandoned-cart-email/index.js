const Airtable = require('airtable');
const {
  updateTicketPurchaseStatus,
  sendAbandonedCartEmail,
  getRecords,
  removeDuplicateContacts,
} = require('./utils');

require('dotenv').config({ path: '.env.local' });

var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

async function run() {
  let marketingContacts = await getRecords('Marketing', airtableBase);
  let ticketPurchasers = await getRecords(
    'Ticket Purchases 2024',
    airtableBase
  );

  marketingContacts = removeDuplicateContacts({
    array: marketingContacts,
    airtableBase,
  });

  const marketingContactsWithUpdatedTicketStatus =
    await updateTicketPurchaseStatus({
      airtableBase,
      marketingContacts,
      ticketPurchasers,
    });

  const filteredContacts = marketingContactsWithUpdatedTicketStatus.filter(
    contact => {
      if (contact.Status !== 'Subscribed') return false;
      if (contact['Abandoned Cart Email'] !== 'Pending') return false;
      if (contact['Has Ticket'] === 'True') return false;
      // TEMPORARY FOR TESTING
      if (contact['Email Address'] !== 'orry.mevorach@gmail.com') return false;
      return true;
    }
  );

  for (let contact of filteredContacts) {
    await sendAbandonedCartEmail({ contact });
    await airtableBase('Marketing').update(contact.id, {
      'Abandoned Cart Email': 'Sent',
    });
  }
}

run();
