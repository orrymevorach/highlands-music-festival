import { useCheckout } from 'components/checkout/hooks';
import React, { createContext, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export const CheckoutProvider = ({ children }) => {
  const checkout = useCheckout();
  return (
    <CheckoutContext.Provider value={checkout}>
      {children}
    </CheckoutContext.Provider>
  );
};
