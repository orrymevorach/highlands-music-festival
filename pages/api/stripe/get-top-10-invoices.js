const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const {} = req.body;
    try {
      const startDate = new Date('2023-10-01'); // Oct 1, 2023
      const endDate = new Date('2024-09-27');
      // Fetch invoices within the date range
      const invoices = await stripe.charges.list({
        created: {
          gte: startDate, // Start date (timestamp)
          lte: endDate, // End date (timestamp)
        },
        limit: 100, // Fetch up to 100 invoices (Stripe default is 10, max is 100)
      });

      // Sort invoices by total amount in descending order
      const sortedPayments = invoices.data
        .filter(
          charge =>
            charge.status === 'succeeded' && charge.amount_refunded === 0 // Exclude refunded payments
        ) // Only successful payments
        .sort((a, b) => b.amount - a.amount) // Sort by amount (descending)
        .slice(0, 10) // Get top 10
        .map(invoice => {
          return {
            id: invoice.id,
            amount: `$${invoice.amount / 100}`,
            date: new Date(invoice.created * 1000).toLocaleDateString(),
            email: invoice.receipt_email,
          };
        });

      res.status(200).json({ sortedPayments });
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}
