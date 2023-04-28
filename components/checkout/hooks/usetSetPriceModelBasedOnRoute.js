import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { actions } from './useCheckout';
import { isObjEmpty } from 'utils/utils';

export default function usetSetPriceModelBasedOnRoute({ dispatch }) {
  const { query } = useRouter();

  useEffect(() => {
    if (isObjEmpty(query)) return;
    else if (query.installments && query.installments === 'false') {
      dispatch({ type: actions.SET_SINGLE_PAYMENT });
    } else {
      dispatch({ type: actions.SET_SUBSCRIPTION_PAYMENT });
    }
  }, [query, query.installments]);
}
