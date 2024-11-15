import { useReducer } from 'react';
import { useCancelPaymentIntent } from 'components/CheckoutPage/hooks';
import {
  calculatePricing,
  getDefaultSubscriptionData,
} from '../checkout-utils';

export const actions = {
  SET_QUANTITY: 'SET_QUANTITY',
  SET_PAYMENT_INTENT: 'SET_PAYMENT_INTENT',
  CANCEL_PAYMENT_INTENT: 'CANCEL_PAYMENT_INTENT',
  APPLY_PROMO_CODE: 'APPLY_PROMO_CODE',
  APPLY_FIXED_PRICE_PROMO: 'APPLY_FIXED_PRICE_PROMO',
  SET_PRICING: 'SET_PRICING',
  SET_SUBSCRIPTION: 'SET_SUBSCRIPTION,',
};
const {
  SET_QUANTITY,
  SET_PAYMENT_INTENT,
  SET_SUBSCRIPTION,
  CANCEL_PAYMENT_INTENT,
  APPLY_PROMO_CODE,
  APPLY_FIXED_PRICE_PROMO,
  SET_PRICING,
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
    case SET_PRICING:
      return {
        ...state,
        pricing: action.pricing,
      };
    case SET_SUBSCRIPTION:
      return {
        ...state,
        subscriptionData: action.subscriptionData,
      };
    default:
      return state;
  }
};

export default function useCheckout({ priceModel }) {
  // Start -Setting Initial Pricing Data
  const initialPricing = calculatePricing({
    priceData: priceModel,
    quantity: 1,
  });

  const defaultSubscriptionData = getDefaultSubscriptionData(initialPricing);

  // End - Setting Initial Pricing Data

  const initialState = {
    quantity: 1,
    customer: null,
    paymentIntent: null,
    priceData: initialPricing,
    promoCode: '',
    vendorName: '',
    vendorSecondGuest: '',
    subscriptionData: defaultSubscriptionData,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useCancelPaymentIntent({
    paymentIntent: state.paymentIntent,
    dispatch,
    actions,
  });

  return {
    ...state,
    dispatch,
    actions,
  };
}
