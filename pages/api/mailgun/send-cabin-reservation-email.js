let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // const { paymentIntentId, emailAddress } = req.body;

  const emailAddress = req.body?.emailAddress || req.query?.emailAddress;
  const paymentIntentId =
    req.body?.paymentIntentId || req.query?.paymentIntentId;

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
    to: emailAddress,
    subject: 'Cabin Reservation Credentials',
    html: `
    <div>
      <p>Please visit our Cabin Reservation System at https://reservations.highlandsmusicfestival.ca to make a reservation for yourself and/or members of your group.</p>
      <p style="margin:20px 0;">Your password is <span style="font-weight:bold">${paymentIntentId}</span></p>
      <p>If you have any question or concerns, please contact us at info@highlandsmusicfestival.ca</p>
      <p><em>Please do not reply to this email</em></p>
      <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min-small.0900c997.png&w=2048&q=75" style="width:300px;" }} />
    </div>
    `,
  });

  res.status(200).json({ success: true });
}
