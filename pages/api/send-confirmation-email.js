let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  const { emailAddress } = req.body;

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
    subject: 'Congratulations – you’re headed to the Highlands!',
    html: `




    <div>
        <h2>Congratulations – you’re headed to the Highlands!</h2>
        <p>Thank you for being a trailblazer! Your support means the world to us, and we are thrilled that you are joining us again in 2024.</p>
        <p>If you chose to pay for your ticket(s) in instalments your credit card will automatically be charged according to your payment schedule.</p>
        <p>If you chose to pay in full, you're good to go!</p>
        <p>Closer to the festival we will send you a link to register for your cabin, as well as a full registration form where you can indicate any dietary needs, and much more.</p>
        <p>For now, we invite you to visit us at <a href="www.highlandsmusicfestival.ca">www.highlandsmusicfestival.ca</a> and follow us <a href="https://www.instagram.com/highlandsmusicfestival/">@highlandsmusicfestival</a> for all event details and announcements! Check out our helpful FAQ page <a href="www.highlandsmusicfestival.ca/faq">here.</a></p>
        <p>If you have any questions at all please feel free to reach out on socials or emails us at info@highlandsmusicfestival.ca.</p>
        <p>The countdown is ON.</p>
        <img src="https://reservations.highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min.effb0614.png&w=3840&q=75" style="width:300px;" }} />
      </div>
    `,
  });

  res.status(200).json({ success: true });
}
