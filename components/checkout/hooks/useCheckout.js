import { useState } from 'react';
import { useCancelPaymentIntent } from 'components/checkout/hooks';

export default function useCheckout({ priceModel }) {
  const [customer, setCustomer] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pricing, setPricing] = useState(null);

  useCancelPaymentIntent({ paymentIntent, setPaymentIntent });
  return {
    customer,
    setCustomer,
    paymentIntent,
    setPaymentIntent,
    quantity,
    setQuantity,
    isLoading,
    setIsLoading,
    priceData: {
      ...priceModel,
      ...pricing,
    },
    setPricing,
  };
}
