import { useCheckout } from 'components/CheckoutPage/hooks';
import React, { createContext, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export const CheckoutProvider = ({ children, priceModel, product }) => {
  const checkout = useCheckout({ priceModel });
  return (
    <CheckoutContext.Provider value={{ ...checkout, product }}>
      {children}
    </CheckoutContext.Provider>
  );
};
