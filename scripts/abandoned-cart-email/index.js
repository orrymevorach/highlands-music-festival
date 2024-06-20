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
  let marketingContacts, ticketPurchasers;
  try {
    console.log('Getting Marketing Contacts...');
    marketingContacts = await getRecords('Marketing');
    console.log('Success!');
  } catch (error) {
    console.error('Error getting marketing contacts:', error);
  }
  try {
    console.log('Getting Ticket Purchasers...');
    ticketPurchasers = await getRecords('Ticket Purchases 2024');
    console.log('Success!');
  } catch (error) {
    console.error('Error getting ticket purchasers:', error);
  }

  try {
    console.log('Removing Duplicate Contacts');
    marketingContacts = await removeDuplicateContacts({
      array: marketingContacts,
    });
    console.log('Success!');
  } catch {
    console.error('Error removing duplicates', error);
  }

  let marketingContactsWithUpdatedTicketStatus;
  try {
    console.log('Updating Ticket Purchase Status...');
    marketingContactsWithUpdatedTicketStatus = await updateTicketPurchaseStatus(
      {
        marketingContacts,
        ticketPurchasers,
      }
    );
    console.log('Success!');
  } catch (error) {
    console.error('Error updating ticket purchase status', error);
  }

  console.log('Filtering contacts...');
  const filteredContacts = marketingContactsWithUpdatedTicketStatus.filter(
    contact => {
      if (contact.Status !== 'Subscribed') return false;
      if (contact['Abandoned Cart Email'] !== 'Pending') return false;
      if (contact['Has Ticket'] === 'True') return false;
      // TEMPORARY FOR TESTING
      // if (contact['Email Address'] !== 'orry.mevorach@gmail.com') return false;
      return true;
    }
  );
  console.log('Success!');
  console.log('Sending Abandoned Cart Emails...');
  for (let contact of filteredContacts) {
    try {
      await sendAbandonedCartEmail({ contact });
    } catch (error) {
      console.error('Error sending abandoned cart emails:', error);
    }
    console.log('Success!');

    try {
      console.log('Updating Email Status...');
      await airtableBase('Marketing').update(contact.id, {
        'Abandoned Cart Email': 'Sent',
      });
      console.log('Success!');
    } catch (error) {
      console.error('Error updating email status', error);
    }
  }
}
module.exports = run;
