import { useReducer } from 'react';
import { useCancelPaymentIntent } from 'components/checkout/hooks';

const initialState = {
  quantity: null,
  customer: null,
  paymentIntent: null,
  pricing: null,
  promoCode: '',
};

const actions = {
  SET_QUANTITY: 'SET_QUANTITY',
  SET_PAYMENT_INTENT: 'SET_PAYMENT_INTENT',
  CANCEL_PAYMENT_INTENT: 'CANCEL_PAYMENT_INTENT',
  APPLY_PROMO_CODE: 'APPLY_PROMO_CODE',
};
const {
  SET_QUANTITY,
  SET_PAYMENT_INTENT,
  CANCEL_PAYMENT_INTENT,
  APPLY_PROMO_CODE,
} = actions;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_QUANTITY:
      return {
        ...state,
        quantity: action.quantity,
        pricing: action.pricing,
      };
    case SET_PAYMENT_INTENT:
      return {
        ...state,
        paymentIntent: action.paymentIntent,
        customer: action.customer,
        pricing: action.pricing,
      };
    case CANCEL_PAYMENT_INTENT:
      return {
        ...state,
        paymentIntent: action.paymentIntent,
      };
    case APPLY_PROMO_CODE:
      return {
        ...state,
        promoCode: action.promoCode,
        pricing: action.pricing,
      };
    default:
      return state;
  }
};

export default function useCheckout({ priceModel }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quantity, customer, paymentIntent, pricing, promoCode } = state;

  useCancelPaymentIntent({ paymentIntent, dispatch, actions });
  return {
    dispatch,
    actions,
    customer,
    paymentIntent,
    quantity,
    priceData: {
      ...priceModel,
      ...pricing,
    },
    promoCode,
  };
}
