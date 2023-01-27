import React from 'react';
import '../styles/global.scss';
import Faq from '@components/faq/faq';
import Head from '@components/head';
import { EmailCaptureProvider } from '../context/emailCaptureContext';

const FAQPage = () => {
  return (
    <EmailCaptureProvider>
      <Head />
      <Faq />
    </EmailCaptureProvider>
  );
};
export default FAQPage;
