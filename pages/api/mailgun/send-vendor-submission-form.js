let nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

export default async function handler(req, res) {
  const { fields, recId } = req.body;

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
    to: 'orry.mevorach@gmail.com',
    subject: 'Vendor Submission',
    html: `
    <div style="width:550px;margin:0 auto;display:block">
        <h2 style="font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:24px">New Vendor Submission for Highlands!</h2>
        ${fieldData}
        <div>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors/accept-vendor-submission-form?recId=${recId}&status=Accepted" style="background-color:#33421b;color:white;padding:12px 20px;border-radius:3px;text-decoration:none;display:inline-block;text-align:center;font-size:18px;margin:20px 20px 0 0;">Accept Vendor</button>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors/accept-vendor-submission-form?recId=${recId}&status=Rejected" style="background-color:red;color:white;padding:12px 20px;border-radius:3px;text-decoration:none;display:inline-block;text-align:center;font-size:18px;margin:20px 20px 0 0;">Reject Vendor</button>
        </div>
        <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min.effb0614.png&w=640&q=10" style="width:300px;margin-top:40px;" }} />
      </div>
    `,
  });

  res.status(200).json({ success: true });
}
