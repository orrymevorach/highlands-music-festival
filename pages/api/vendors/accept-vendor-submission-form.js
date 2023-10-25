const Airtable = require('airtable');
let nodemailer = require('nodemailer');
import { transformFields } from 'lib/airtable-lib';

require('dotenv').config({ path: '.env.local' });

// Airtable Config
var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  const { recId, status } = req.query;

  try {
    // Update airtable record
    const response = await airtableBase('Vendor Submissions').update([
      {
        id: recId,
        fields: {
          Status: status,
        },
      },
    ]);

    // Send email to vendor
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_SMTP_PASSWORD,
      },
    });

    const fields = transformFields({ record: response[0] });
    await transporter.sendMail({
      from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
      to: fields.emailAddress,
      subject: 'See you at Highlands!',
      html: `
      <div style="width:550px;margin:0 auto;display:block">
          <h2 style="font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:24px">Accepted for Highlands!</h2>
          <p>Please visit our <a href="https://highlandsmusicfestival.ca/checkout?installments=false">checkout page</a> and use the promo code VENDORS at checkout to secure your spot."</p>
          <p>We can't wait to see you at Highlands!</p>
          <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min.effb0614.png&w=640&q=10" style="width:300px;margin-top:40px;" }} />
        </div>
      `,
    });

    // Redirect to airtable record
    res.redirect(
      307,
      `https://airtable.com/appsVLTJBkSew9M4y/tblqRyAOv82QPuHvX/viweS5vyIsw5MMvEb/${recId}?blocks=hide`
    );
  } catch (error) {
    res.status(500).send({ error });
  }
}
