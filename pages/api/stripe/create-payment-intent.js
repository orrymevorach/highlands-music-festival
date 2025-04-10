const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customer, amount, metadata } = req.body;
      console.log('Creating payment intent...');

      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        setup_future_usage: 'off_session',
        amount: Math.round(amount * 100),
        currency: 'cad',
        automatic_payment_methods: {
          enabled: true,
        },
        metadata,
        // saves card for future subscription payments
        payment_method_options: {
          card: {
            setup_future_usage: 'off_session',
          },
        },
      });
      res.status(200).json(paymentIntent);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
