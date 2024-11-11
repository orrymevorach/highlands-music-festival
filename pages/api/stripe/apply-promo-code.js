const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { promoCode, customer, paymentIntent, quantity } = req.body;

      const promotionCodes = await stripe.promotionCodes.list({
        limit: 100,
        active: true,
        code: promoCode,
      });
      const selectedPromoCode = promotionCodes.data.find(
        ({ code }) => code === promoCode
      );
      if (!selectedPromoCode) {
        res.status(400).json({
          error: {
            status: 400,
            message: 'Promo code not found.',
          },
        });
        return;
      }

      if (
        selectedPromoCode.customer &&
        selectedPromoCode.customer !== customer.id
      ) {
        res.status(401).json({
          error: {
            status: 401,
            message: 'This promotion code is not valid for this user.',
          },
        });
        return;
      }

      const { amount: originalAmount, metadata } = paymentIntent;
      const amount = Math.round(
        (originalAmount / 1.13 -
          selectedPromoCode.coupon.amount_off * quantity) *
          1.13
      );
      if (amount < 0) {
        res.status(401).json({
          error: {
            status: 401,
            message:
              'Oh no! This voucher is only valid for tickets paid in full. <a href="/checkout?installments=false">Click here</a> to proceed.',
          },
        });
        return;
      }
      const updatedMetadata = {
        ...metadata,
        promoCode: selectedPromoCode.code,
        promoAmount: (selectedPromoCode.coupon.amount_off / 100) * quantity,
      };

      const updatedPaymentIntent = await stripe.paymentIntents.update(
        paymentIntent.id,
        {
          amount,
          metadata: updatedMetadata,
        }
      );
      const response = {
        promoCodeData: selectedPromoCode,
        paymentIntent: updatedPaymentIntent,
      };
      res.status(200).json(response);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
