const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const convertDateToTimestamp = startDate => {
  const [year, month, day] = startDate.split('T')[0].split('-');
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  return date;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customerId, quantity, priceData } = req.body;

      const {
        subscriptionId,
        subscriptionStartDate,
        numberOfSubscriptionIterations,
      } = priceData;

      const schedule = await stripe.subscriptionSchedules.create({
        customer: customerId,
        start_date: convertDateToTimestamp(subscriptionStartDate),
        end_behavior: 'release',
        phases: [
          {
            items: [
              {
                price: subscriptionId,
                quantity: parseInt(quantity),
              },
            ],
            iterations: numberOfSubscriptionIterations,
          },
        ],
      });
      res.send(200);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
