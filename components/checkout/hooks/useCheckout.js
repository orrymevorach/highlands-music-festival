import { useReducer } from 'react';
import { useCancelPaymentIntent } from 'components/checkout/hooks';

const initialState = {
  quantity: null,
  customer: null,
  paymentIntent: null,
  pricing: null,
};

const actions = {
  SET_QUANTITY: 'SET_QUANTITY',
  SET_PAYMENT_INTENT: 'SET_PAYMENT_INTENT',
  CANCEL_PAYMENT_INTENT: 'CANCEL_PAYMENT_INTENT',
};
const { SET_QUANTITY, SET_PAYMENT_INTENT, CANCEL_PAYMENT_INTENT } = actions;

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
    default:
      return state;
  }
};

export default function useCheckout({ priceModel }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quantity, customer, paymentIntent, pricing } = state;

  useCancelPaymentIntent({ paymentIntent, dispatch, actions });
  return {
    customer,
    paymentIntent,
    quantity,
    priceData: {
      ...priceModel,
      ...pricing,
    },
    dispatch,
    actions,
  };
}
