import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { actions } from './useCheckout';

export default function usetSetPriceModelBasedOnRoute({ dispatch }) {
  const { query } = useRouter();
  useEffect(() => {
    if (query.installments && query.installments === 'false') {
      dispatch({ type: actions.SET_SINGLE_PAYMENT });
    }
  }, [query.installments]);
}
