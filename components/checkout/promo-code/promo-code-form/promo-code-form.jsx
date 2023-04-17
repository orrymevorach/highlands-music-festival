import React, { useState } from 'react';
import styles from './promo-code-form.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import Input from '@mui/joy/Input';
import { applyPromoCode } from 'lib/stripe-lib';
import { calculatePricing } from 'components/checkout/checkout-utils';
import {
  ErrorMessage,
  SubmitButton,
} from 'components/checkout/checkout-shared-components';

export default function PromoCodeForm() {
  const [promoCode, setPromoCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { actions, dispatch, customer, priceData, quantity, paymentIntent } =
    useCheckoutContext();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const {
      promoCodeData,
      paymentIntent: updatedPaymentIntent,
      error,
    } = await applyPromoCode({
      promoCode,
      customer,
      paymentIntent,
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } else {
      const pricing = calculatePricing({
        priceData,
        quantity,
        promoAmount: promoCodeData.coupon.amount_off,
        firstInstalmentTotalAfterTax: updatedPaymentIntent.amount / 100,
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
      <SubmitButton isLoading={isLoading}>Apply Voucher</SubmitButton>
    </form>
  );
}
