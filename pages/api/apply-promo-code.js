const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { promoCode, customer, paymentIntent } = req.body;

      const promotionCodes = await stripe.promotionCodes.list({
        limit: 3,
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
        (originalAmount / 1.13 - selectedPromoCode.coupon.amount_off) * 1.13
      );
      const updatedMetadata = {
        ...metadata,
        promoCode: selectedPromoCode.code,
        promoAmount: selectedPromoCode.coupon.amount_off / 100,
        firstInstalmentTotalAfterTax: amount / 100,
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
