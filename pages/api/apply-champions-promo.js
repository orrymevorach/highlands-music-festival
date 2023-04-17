import { getPriceModel } from 'lib/contentful-lib';
import { PRICE_MODEL_AUDIENCES } from 'utils/constants';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { promoCode, customer, paymentIntent } = req.body;

      const promotionCodes = await stripe.promotionCodes.list();

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
      if (selectedPromoCode.customer !== customer.id) {
        res.status(401).json({
          error: {
            status: 401,
            message: 'This promotion code is not valid for this user.',
          },
        });
        return;
      }

      const championsPriceModel = await getPriceModel({
        audience: PRICE_MODEL_AUDIENCES.CHAMPIONS,
      });

      const amount = Math.round(
        championsPriceModel?.firstInstalmentPerUnitBeforeTax * 100 * 1.13
      );

      const { metadata } = paymentIntent;

      const updatedPricingData = {
        ...metadata,
        promoCode: selectedPromoCode.code,
        promoAmount: null,
        firstInstalmentTotalAfterTax: amount / 100,
        discountAmountPerUnit: '',
        discountName: '',
        discountTotal: '',
        subscriptionId: '',
        subscriptionStartDate: '',
        subscriptionInstallmentAmount: '',
        subtotal: championsPriceModel?.firstInstalmentPerUnitBeforeTax,
        tax: championsPriceModel?.firstInstalmentPerUnitBeforeTax * 0.13,
        total: amount / 100,
        numberOfSubscriptionIterations: 0,
        ticketPrice: championsPriceModel?.firstInstalmentPerUnitBeforeTax,
        quantity: 1,
      };

      const updatedPaymentIntent = await stripe.paymentIntents.update(
        paymentIntent.id,
        {
          amount,
          metadata: updatedPricingData,
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
