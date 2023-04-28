import { useReducer } from 'react';
import {
  useCancelPaymentIntent,
  usetSetPriceModelBasedOnRoute,
} from 'components/checkout/hooks';

const initialState = {
  quantity: null,
  customer: null,
  paymentIntent: null,
  pricing: null,
  promoCode: '',
  paymentType: null,
};

export const actions = {
  SET_SINGLE_PAYMENT: 'SET_SINGLE_PAYMENT',
  SET_SUBSCRIPTION_PAYMENT: 'SET_SUBSCRIPTION_PAYMENT',
  SET_QUANTITY: 'SET_QUANTITY',
  SET_PAYMENT_INTENT: 'SET_PAYMENT_INTENT',
  CANCEL_PAYMENT_INTENT: 'CANCEL_PAYMENT_INTENT',
  APPLY_PROMO_CODE: 'APPLY_PROMO_CODE',
  APPLY_CHAMPIONS_PROMO: 'APPLY_CHAMPIONS_PROMO',
};
const {
  SET_QUANTITY,
  SET_PAYMENT_INTENT,
  CANCEL_PAYMENT_INTENT,
  APPLY_PROMO_CODE,
  APPLY_CHAMPIONS_PROMO,
  SET_SINGLE_PAYMENT,
  SET_SUBSCRIPTION_PAYMENT,
} = actions;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION_PAYMENT:
      return {
        ...state,
        paymentType: 'subscription',
      };
    case SET_SINGLE_PAYMENT:
      return {
        ...state,
        pricing: {
          ...state.pricing,
          subscriptionId: '',
          subscriptionStartDate: '',
          subscriptionInstallmentAmount: '',
          numberOfSubscriptionIterations: '',
          firstInstalmentTotalAfterTax: '',
        },
        paymentType: 'single',
      };
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
    case APPLY_CHAMPIONS_PROMO:
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
          subscriptionStartDate: '',
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
  const { quantity, customer, paymentIntent, pricing, promoCode, paymentType } =
    state;

  usetSetPriceModelBasedOnRoute({ dispatch });
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
    paymentType,
  };
}
