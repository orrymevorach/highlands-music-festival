import React, { createContext, useContext, useState } from 'react';
import useEmailCapture from '../hooks/useEmailCapture';

const EmailCaptureContext = createContext();

export const useEmailCaptureContext = () => {
  return useContext(EmailCaptureContext);
};

export const EmailCaptureProvider = ({ children }) => {
  const emailCaptureData = useEmailCapture();
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const value = {
    ...emailCaptureData,
    setShowEmailCapture,
    showEmailCapture,
  };
  return (
    <EmailCaptureContext.Provider value={value}>
      {children}
    </EmailCaptureContext.Provider>
  );
};
