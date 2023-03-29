const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getMayFirst = () => {
  let mayFirst = new Date();
  mayFirst.setFullYear(2023);
  mayFirst.setMonth(4);
  mayFirst.setDate(1);

  mayFirst = Math.floor(mayFirst / 1000);

  return mayFirst;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customerId, name, email } = req.body;

      const updatedCustomer = await stripe.customers.update(customerId, {
        name,
        email,
      });

      const schedule = await stripe.subscriptionSchedules.create({
        customer: customerId,
        start_date: getMayFirst(),
        end_behavior: 'release',
        phases: [
          {
            items: [{ price: 'price_1MqurjAzwwMUcbvF7N53lwec', quantity: 1 }],
            iterations: 3,
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
