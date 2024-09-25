let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // const { emailAddress } = req.body;
  const emailAddress = req.body?.emailAddress || req.query?.emailAddress;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  // await transporter.sendMail({
  //   from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
  //   to: emailAddress,
  //   subject: 'Congratulations – you’re headed to the Highlands!',
  //   html: `
  //     <div>
  //       <h2>Congratulations – you’re headed to the Highlands!</h2>
  //       <p>If you chose to pay for your ticket(s) in instalments your credit card will automatically be charged according to your payment schedule.</p>
  //       <p>If you chose to pay in full, you're good to go!</p>
  //       <p>Closer to the festival we will send you a link to register for your cabin, as well as a full registration form where you can indicate any dietary needs, and much more.</p>
  //       <p>For now, we invite you to visit us at <a href="www.highlandsmusicfestival.ca">www.highlandsmusicfestival.ca</a> and follow us <a href="https://www.instagram.com/highlandsmusicfestival/">@highlandsmusicfestival</a> for all event details and announcements! Check out our helpful FAQ page <a href="www.highlandsmusicfestival.ca/faq">here.</a></p>
  //       <p>If you have any questions at all please feel free to reach out on socials or emails us at info@highlandsmusicfestival.ca.</p>
  //       <p>The countdown is ON.</p>
  //       <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min-small.0900c997.png&w=2048&q=75" style="width:300px;" }} />
  //     </div>
  //   `,
  // });
  await transporter.sendMail({
    from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
    to: emailAddress,
    subject: 'Congratulations – you’re headed to the Highlands 2025!',
    html: `
      <div>
        <h2>Congratulations – you’re headed to the Highlands 2025!</h2>
        <p>If you purchased a general admission ticket, you are all set! Closer to the festival we will send you a link to register for your cabin, as well as a full registration form where you can indicate any dietary needs, and much more.</p>
        <p>If you paid a deposit for a cabin, we will be in touch shortly to complete your payment.</p>
        <p>For now, we invite you to visit us at <a href="www.highlandsmusicfestival.ca">www.highlandsmusicfestival.ca</a> and follow us <a href="https://www.instagram.com/highlandsmusicfestival/">@highlandsmusicfestival</a> for all event details and announcements!</p>
        <p>If you have any questions at all please feel free to reach out on socials or emails us at info@highlandsmusicfestival.ca.</p>
        <p>The countdown is ON.</p>
        <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min-small.0900c997.png&w=2048&q=75" style="width:300px;" }} />
      </div>
    `,
  });

  res.status(200).json({ success: true });
}
