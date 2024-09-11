// This script is intended for one time use
// When we run this script, we send an email to everyone who has already bought a ticket. The email contains their password information
// To switch between development and production, change the name of the base

require('dotenv').config({ path: '.env.local' });

let nodemailer = require('nodemailer');
let Airtable = require('airtable');

let transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
});

let base = Airtable.base(process.env.AIRTABLE_BASE);

async function run() {
  console.log('Starting script...');
  base('Ticket Purchases 2024')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(async function (record) {
          const email = record.get('Email Address');
          const paymentIntentId = record.get('paymentIntent');
          const status = record.get('Status');
          if (status !== 'Ticket Purchased') return;

          try {
            await transporter.sendMail({
              from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
              to: email,
              subject: 'Cabin Reservation Credentials',
              html: `
              <div>
              <p>Please visit our Cabin Reservation System at https://reservations.highlandsmusicfestival.ca to make a reservation for yourself and/or members of your group.</p>
              <p style="margin:20px 0;">Your password is <span style="font-weight:bold">${paymentIntentId}</span></p>
              <p>If you have any question or concerns, please contact us at info@highlandsmusicfestival.ca</p>
              <p><em>Please do not reply to this email</em></p>
              <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min-small.0900c997.png&w=2048&q=75" style="width:300px;" }} />
              </div>`,
            });
            console.log('success', email);
          } catch (err) {
            console.error(err);
          }
        });
        fetchNextPage(); // To ensure we see all records
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Done!');
      }
    );
}

run();
