let nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

export default async function handler(req, res) {
  const { fields } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  const fieldData = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<div style="margin: 10px 0;">
          <p style="color:#2f2f2f;text-transform:lowercase;font-size:14px;margin:0;">${key}</p>
          <p style="font-size:16px;margin:0;">${value}</p>
        </div>
        `
    )
    .join(''); // join removes the trailing commas

  await transporter.sendMail({
    from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
    to: 'marketplace@highlandsmusicfestival.ca',
    subject: 'Vendor Submission',
    html: `
    <div style="width:550px;margin:0 auto;display:block">
        <h2 style="font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:24px">New Vendor Submission for Highlands!</h2>
        ${fieldData}
        <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min.effb0614.png&w=640&q=10" style="width:300px;margin-top:40px;" }} />
      </div>
    `,
  });

  res.status(200).json({ success: true });
}
