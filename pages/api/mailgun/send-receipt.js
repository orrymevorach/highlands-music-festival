import { getInstallmentDate } from 'components/CheckoutPage/checkout-utils';
import { formatPrice } from 'components/CheckoutPage/order-summary/order-summary-shared';

let nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const {
    priceData,
    subscriptionData,
    customer,
    promoCode,
    paymentResponse,
    paymentMethodId,
  } = req.body || req.query;

  const {
    discountName,
    discountTotal,
    ticketPrice,
    subtotal,
    total,
    tax,
    promoAmount,
    name: productName,
    deposit = '',
  } = priceData;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  const isSubscription = subscriptionData.subscriptionId;
  const numberOfSubscriptionIterationsAsArray =
    subscriptionData.numberOfSubscriptionIterations
      ? Array.from(Array(subscriptionData.numberOfSubscriptionIterations))
      : 0;

  const creditCard = await stripe.paymentMethods.retrieve(paymentMethodId);
  const last4Digits = creditCard.card.last4;
  const cardType = creditCard.card.brand.toUpperCase();

  const datePaid = new Date(paymentResponse.created * 1000).toLocaleString(
    'en-US',
    {
      weekday: 'long', // e.g. 'Monday'
      year: 'numeric', // e.g. '2025'
      month: 'long', // e.g. 'March'
      day: 'numeric', // e.g. '22'
      hour: 'numeric', // e.g. '2'
      minute: 'numeric', // e.g. '30'
      hour12: true, // Use 12-hour format
    }
  );

  const amountPaid = isSubscription
    ? formatPrice(subscriptionData.subscriptionInstallmentAmount)
    : formatPrice(paymentResponse.amount / 100);

  await transporter.sendMail({
    from: 'Highlands Music Festival noreply@highlandsmusicfestival.ca',
    to: customer.email,
    subject: 'Your Highlands Music Festival receipt',
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


              <p style="text-align:center;font-size:24px;font-weight:bold">Receipt from Highlands Music Festival</p>
              <div style="border: 1px solid #e4e4e4;width:100%;margin-bottom:20px;"></div>

              <table style="width: 500px; border-spacing: 0; border-collapse: collapse; margin: 0 auto;">
                <thead>
                  <tr>
                    <th style="font-size: 13px; margin: 0; text-align: left; text-transform: uppercase; width: 25%; color: #8898AB;">
                      Amount Paid
                    </th>
                    <th style="font-size: 13px; margin: 0; text-align: left; text-transform: uppercase; width: 50%; color: #8898AB;">
                      Date Paid
                    </th>
                    <th style="font-size: 13px; margin: 0; text-align: left; text-transform: uppercase; width: 25%; color: #8898AB;">
                      Payment Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 25%; padding-top: 5px; padding-right: 25px; text-align: left; font-size: 14px; margin: 0; vertical-align: top; font-weight: bold;">
                      ${amountPaid}
                    </td>
                    <td style="width: 50%; padding-top: 5px; padding-right: 25px; text-align: left; font-size: 14px; margin: 0; vertical-align: top; font-weight: bold;">
                      ${datePaid}
                    </td>
                    <td style="width: 25%; padding-top: 5px; padding-right: 25px; text-align: left; font-size: 14px; margin: 0; vertical-align: top; font-weight: bold;">
                      ${cardType} - ${last4Digits}
                    </td>
                  </tr>
                </tbody>
              </table>

              
              <div style="background-color:#F6F9FC; padding: 20px; margin-top: 20px;">
                <table style="width: 380px; margin: 0 auto; border-spacing: 0; border-collapse: collapse;">
                  <tr>
                    <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                      1 x ${productName}:
                    </td>
                    <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                      ${formatPrice(ticketPrice)}
                    </td>
                  </tr>

                  ${
                    discountName && discountTotal
                      ? `
                      <tr>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                          ${discountName}:
                        </td>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                          -${formatPrice(discountTotal)}
                        </td>
                      </tr>`
                      : ''
                  }

                  ${
                    promoCode
                      ? `
                      <tr>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                          ${promoCode} Promotion x 1:
                        </td>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                          -${formatPrice(promoAmount)}
                        </td>
                      </tr>`
                      : ''
                  }

                  <div style="margin-top:20px"/>
                  <tr>
                    <td colspan="2" style="border-top: 1px solid #e4e4e4; padding: 5px 0;"></td>
                  </tr>

                  ${
                    subtotal
                      ? `
                      <tr>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                          Subtotal:
                        </td>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                          ${formatPrice(subtotal)}
                        </td>
                      </tr>`
                      : ''
                  }

                  ${
                    tax
                      ? `
                      <tr>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                          HST (13%):
                        </td>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                          ${formatPrice(tax)}
                        </td>
                      </tr>`
                      : ''
                  }

                  <div style="margin-top:20px"/>
                  <tr>
                    <td colspan="2" style="border-top: 1px solid #e4e4e4; padding: 5px 0;"></td>
                  </tr>

                  <tr>
                    <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                      Total:
                    </td>
                    <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                      ${formatPrice(total)}
                    </td>
                  </tr>

                  <div style="margin-top:20px"/>
                  <tr>
                    <td colspan="2" style="border-top: 1px solid #e4e4e4; padding: 5px 0;"></td>
                  </tr>

                  ${
                    deposit
                      ? `
                      <tr>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0;">
                          Deposit:
                        </td>
                        <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                          ${formatPrice(deposit)}
                        </td>
                      </tr>`
                      : ''
                  }

                  ${
                    isSubscription
                      ? `
                      <div>
                        <tr>
                          <td colspan="2" style="font-size: 18px; font-weight:bold;padding: 5px 0; text-align: center;">
                            Subscription Payment Schedule
                          </td>
                        </tr>
                        <div style="margin-bottom:20px;"></div>
                      </div>`
                      : ''
                  }

                  ${
                    isSubscription
                      ? numberOfSubscriptionIterationsAsArray
                          .map((_, index) => {
                            const { month, day, year } = getInstallmentDate({
                              iteration: index,
                            });
                            if (index === 0) {
                              return `
                              <tr>
                                <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: left;">
                                  ${month} ${day}, ${year} (Paid)
                                </td>
                                <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                                  ${formatPrice(
                                    subscriptionData.subscriptionInstallmentAmount
                                  )}
                                </td>
                              </tr>`;
                            }
                            return `
                            <tr>
                              <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: left;">
                                ${month} ${day}, ${year}
                              </td>
                              <td style="font-size: 15px; font-weight:bold; padding: 5px 0; text-align: right;">
                                ${formatPrice(
                                  subscriptionData.subscriptionInstallmentAmount
                                )}
                              </td>
                            </tr>`;
                          })
                          .join('') // Join all the iterations into a single string
                      : ''
                  }

                  ${
                    isSubscription
                      ? `
                      <div style="margin-bottom: 20px;">
                        <tr>
                          <td colspan="2" style="font-size: 13px;padding: 5px 0;">
                            *Future payments will automatically be charged to your credit card
                          </td>
                        </tr>
                      </div>`
                      : ''
                  }
                  </table>
                </div>
                <p style="font-size:12px;font-weight:boldl;text-align:center">HST Number: 700283740RT0001</p>

            </div>
        </div>
      </div>
    `,
  });

  res.status(200).json({ success: true });
}
