import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { cookies } from '@utils/constants';

export const EmailCaptureContext = createContext();
export const EmailCaptureProvider = ({ children }) => {
  const [hasSubmitted, setHasSubmitted] = useState(true);
  useEffect(() => {
    const EmailCaptureCookie = !!Cookies.get(cookies.emailCaptureCookie);
    setHasSubmitted(EmailCaptureCookie);
  }, []);
  const value = {
    hasSubmitted,
  };
  return (
    <EmailCaptureContext.Provider value={value}>
      {children}
    </EmailCaptureContext.Provider>
  );
};
