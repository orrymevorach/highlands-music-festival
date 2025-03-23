import { getRecordById } from 'lib/airtable-lib';

let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  const { emailAddress, subscriptionRecordId, cabinId } = req.body || req.query;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  let cabinData;
  const isPurchasingCabin = !!cabinId;
  if (isPurchasingCabin) {
    cabinData = await getRecordById({
      tableId: 'Cabins',
      recordId: cabinId,
    });
  }
  const cabinName = cabinData ? cabinData.record.name : '';
  const hasSubscription = !!subscriptionRecordId;

  await transporter.sendMail({
    from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
    to: emailAddress,
    subject: 'Congratulations – you’re headed to the Highlands!',
    html: `
      <div>
        <div style="font-size: 14px; background-color: #f6f9fc; width: 100%; padding: 10px;">
          <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
              <table style="width: 100%; background-color: #DEBF6A; border-spacing: 0; border-collapse: collapse;">
                <tr>
                  <td style="width: 33.3%; text-align: center; padding: 0; veritcal-align: bottom;">
                    <img src="https://highlandsmusicfestival.ca/email-images/left.png" style="height: 156px; width: auto; vertical-align: bottom;"/>
                  </td>
                  <td style="width: 33.3%; text-align: center; padding: 0; veritcal-align: bottom;">
                    <img src="https://highlandsmusicfestival.ca/email-images/middle.png" style="height: 156px; width: auto; position:relative; top: 6px; vertical-align: bottom;"/>
                  </td>
                  <td style="width: 33.3%; text-align: center; padding: 0; veritcal-align: bottom;">
                    <img src="https://highlandsmusicfestival.ca/email-images/right.png" style="height: 156px; width: auto; position:relative; top: 6px; vertical-align: bottom;"/>
                  </td>
                </tr>
              </table>
        
              <p style="text-align:center;font-size:24px;font-weight:bold">Congratulations – you’re headed to the Highlands!</p>
        <div style="border: 1px solid #e4e4e4;width:100%;margin-bottom:20px;"></div>

        <p style="font-size: 16px; font-weight: bold;">Payment Information</p>
        ${
          hasSubscription
            ? `<p>Since you chose to pay in instalments, your credit card will automatically be charged according to your payment schedule.</p>`
            : '<p>Since you have paid in full, you are good to go with no remaining payments.</p>'
        }
        
        
        <p style="font-size: 16px; font-weight: bold;">Cabin Information</p>
        ${
          isPurchasingCabin
            ? `<p>You have purchased cabin ${cabinName}!</p>    
            <p>We will email you in the next few days with instructions on how to add people to your cabin.</p>
            <p>Closer to the festival we will send you a full registration form where you can indicate any dietary needs, and much more.</p>`
            : `<p>Closer to the festival we will send you a link to register for your cabin, as well as a full registration form where you can indicate any dietary needs, and much more.</p>`
        }
        
        <p style="font-size: 16px; font-weight: bold;">Future Announcements</p>
        <p>We invite you to visit us at <a href="www.highlandsmusicfestival.ca">www.highlandsmusicfestival.ca</a> and follow us <a href="https://www.instagram.com/highlandsmusicfestival/">@highlandsmusicfestival</a> for all event details and announcements! Check out our helpful FAQ page <a href="www.highlandsmusicfestival.ca/faq">here.</a></p>
        <p>If you have any questions at all please feel free to reach out on socials or emails us at info@highlandsmusicfestival.ca.</p>
        <p>The countdown is ON.</p>
      </div>
        </div>
        </div>
    `,
  });
  // await transporter.sendMail({
  //   from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
  //   to: emailAddress,
  //   subject: 'Congratulations – you’re headed to the Highlands 2025!',
  //   html: `
  //     <div>
  //       <h2>Congratulations – you’re headed to the Highlands 2025!</h2>
  //       <p>If you purchased a general admission ticket, you are all set! Closer to the festival we will send you a link to register for your cabin, as well as a full registration form where you can indicate any dietary needs, and much more.</p>
  //       <p>If you paid a deposit for a cabin, we will be in touch shortly to complete your payment.</p>
  //       <p>For now, we invite you to visit us at <a href="www.highlandsmusicfestival.ca">www.highlandsmusicfestival.ca</a> and follow us <a href="https://www.instagram.com/highlandsmusicfestival/">@highlandsmusicfestival</a> for all event details and announcements!</p>
  //       <p>If you have any questions at all please feel free to reach out on socials or emails us at info@highlandsmusicfestival.ca.</p>
  //       <p>The countdown is ON.</p>
  //       <img src="https://highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min-small.0900c997.png&w=2048&q=75" style="width:300px;" }} />
  //     </div>
  //   `,
  // });

  res.status(200).json({ success: true });
}
