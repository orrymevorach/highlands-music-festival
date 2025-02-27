const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customerId, subscriptionData, paymentMethodId } = req.body;

      const { subscriptionId, numberOfSubscriptionIterations } =
        subscriptionData;

      const taxRate =
        process.env.STRIPE_ENV === 'production'
          ? 'txr_1QwzWeAzwwMUcbvFAam5fDKt'
          : 'txr_1QwztxAzwwMUcbvFP7mVaoWJ';

      console.log('Creating subscription plan...');

      const schedule = await stripe.subscriptionSchedules.create({
        customer: customerId,
        start_date: 'now',
        end_behavior: 'cancel',
        default_settings: {
          collection_method: 'charge_automatically',
          default_payment_method: paymentMethodId,
        },
        phases: [
          {
            items: [
              {
                price: subscriptionId,
                tax_rates: [taxRate],
              },
            ],
            iterations: parseFloat(numberOfSubscriptionIterations),
          },
        ],
        metadata: {
          hst_number: '700283740RT0001',
        },
      });
      console.log('Subscription plan created successfuly...');
      res.send(schedule);
    } catch (err) {
      res.status(err.statusCode || 500).json({
        error: {
          message: err.message,
        },
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
