const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        user: { name, email },
      } = req.body;
      const customerResponse = await stripe.customers.search({
        query: `email:'${email}' AND name:'${name}'`,
      });

      const hasCustomer = customerResponse.data.length > 0;
      let customer = null;
      if (!hasCustomer) {
        console.log('No user found, creating new user...');
        customer = await stripe.customers.create({ name, email });
      } else {
        console.log('User found, using existing user data...');
        customer = customerResponse.data[0];
      }

      res.status(200).json(customer);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
