import { useReducer } from 'react';
import { useCancelPaymentIntent } from 'components/CheckoutPage/hooks';

const initialState = {
  quantity: null,
  customer: null,
  paymentIntent: null,
  pricing: null,
  promoCode: '',
  vendorName: '',
  vendorSecondGuest: '',
};

export const actions = {
  SET_QUANTITY: 'SET_QUANTITY',
  SET_PAYMENT_INTENT: 'SET_PAYMENT_INTENT',
  CANCEL_PAYMENT_INTENT: 'CANCEL_PAYMENT_INTENT',
  APPLY_PROMO_CODE: 'APPLY_PROMO_CODE',
  APPLY_FIXED_PRICE_PROMO: 'APPLY_FIXED_PRICE_PROMO',
};
const {
  SET_QUANTITY,
  SET_PAYMENT_INTENT,
  CANCEL_PAYMENT_INTENT,
  APPLY_PROMO_CODE,
  APPLY_FIXED_PRICE_PROMO,
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
        vendorName: action.vendorName,
        vendorSecondGuest: action.vendorSecondGuest,
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
    case APPLY_FIXED_PRICE_PROMO:
      return {
        ...state,
        promoCode: action.promoCode,
        quantity: 1,
        pricing: {
          ...action.pricing,
          promoAmount: null,
          discountAmountPerUnit: '',
          discountName: '',
          discountTotal: '',
          subscriptionId: '',
          subscriptionInstallmentAmount: '',
          numberOfSubscriptionIterations: 0,
        },
      };
    default:
      return state;
  }
};

export default function useCheckout({ priceModel }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    quantity,
    customer,
    paymentIntent,
    pricing,
    promoCode,
    vendorName,
    vendorSecondGuest,
  } = state;

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
    vendorName,
    vendorSecondGuest,
  };
}
