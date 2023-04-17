const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentIntent } = req.body;

      const updatedPaymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntent.id
      );
      let response;
      if (updatedPaymentIntent.status !== 'succeeded') {
        console.log('Canceling payment intent...');
        response = await stripe.paymentIntents.cancel(updatedPaymentIntent.id);
      } else {
        console.log('Payment intent stauts is "succeeded", not deleting');
      }

      res.status(200).json(response);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
