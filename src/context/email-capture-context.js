import React, { createContext, useContext } from 'react';
import useEmailCapture from '../hooks/useEmailCapture';

const EmailCaptureContext = createContext();

export const useEmailCaptureContext = () => {
  return useContext(EmailCaptureContext);
};

export const EmailCaptureProvider = ({ children }) => {
  const emailCaptureData = useEmailCapture();
  return (
    <EmailCaptureContext.Provider value={emailCaptureData}>
      {children}
    </EmailCaptureContext.Provider>
  );
};
