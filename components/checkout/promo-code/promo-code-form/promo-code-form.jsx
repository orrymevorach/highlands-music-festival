import React, { useState } from 'react';
import styles from './promo-code-form.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import Input from '@mui/joy/Input';
import {
  applyChampionsPromoCode,
  applyFixedPricePromo,
  applyPromoCode,
} from 'lib/stripe-lib';
import { calculatePricing } from 'components/checkout/checkout-utils';
import { ErrorMessage } from 'components/checkout/checkout-shared-components';
import Button from 'components/shared/button/button';
import { FIXED_PRICE_PROMO_CODES } from 'utils/constants';

export default function PromoCodeForm() {
  const [promoCode, setPromoCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { actions, dispatch, customer, priceData, quantity, paymentIntent } =
    useCheckoutContext();

  // Instructions for creating a fixed price promo:
  // 1. In Contentful, add the promo code ID to the Price Model Validations, and create a price model with the pricing info
  // 2. In Stripe, create the promo code. The amount does not matter.
  // 3. In constants.js, add the promo code to the list of FIXED_PRICE_PROMO_CODES
  const handleFixedPricePromo = async () => {
    const {
      promoCodeData,
      paymentIntent: updatedPaymentIntent,
      error,
    } = await applyFixedPricePromo({
      promoCode,
      paymentIntent,
    });
    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
      setIsLoading(false);
      dispatch({
        type: actions.APPLY_FIXED_PRICE_PROMO,
        promoCode: promoCodeData.code,
        pricing: updatedPaymentIntent.metadata,
      });
    }
  };

  const handleChampionsPromo = async () => {
    const {
      promoCodeData,
      paymentIntent: updatedPaymentIntent,
      error,
    } = await applyChampionsPromoCode({
      promoCode,
      customer,
      paymentIntent,
    });
    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
      setIsLoading(false);
      dispatch({
        type: actions.APPLY_FIXED_PRICE_PROMO,
        promoCode: promoCodeData.code,
        pricing: updatedPaymentIntent.metadata,
      });
    }
  };

  const handlePromo = async () => {
    const {
      promoCodeData,
      paymentIntent: updatedPaymentIntent,
      error,
    } = await applyPromoCode({
      promoCode,
      customer,
      paymentIntent,
      quantity,
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } else {
      const pricing = calculatePricing({
        priceData,
        quantity,
        promoAmount: (promoCodeData.coupon.amount_off / 100) * quantity, // CONVERT CENTS TO DOLLARS
        promoPaymentIntent: updatedPaymentIntent,
      });
      setErrorMessage('');
      setIsLoading(false);
      dispatch({
        type: actions.APPLY_PROMO_CODE,
        promoCode: promoCodeData.code,
        pricing,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (promoCode.includes('CHAMPION')) {
      await handleChampionsPromo();
      return;
    }
    if (FIXED_PRICE_PROMO_CODES.includes(promoCode)) {
      await handleFixedPricePromo();
      return;
    }
    await handlePromo();
  };

  const handleSetPromoCode = e => {
    setErrorMessage('');
    setPromoCode(e.target.value);
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className={styles.promoCode}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Input
        type="text"
        value={promoCode}
        onChange={e => handleSetPromoCode(e)}
        placeholder="Voucher Code (optional)"
        fullWidth
      />
      <Button isLoading={isLoading}>Apply Voucher</Button>
    </form>
  );
}
