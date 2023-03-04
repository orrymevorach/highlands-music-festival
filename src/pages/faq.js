import React from 'react';
import '../styles/global.scss';
import Faq from '@components/faq/faq';
import Head from '@components/head';
import { EmailCaptureProvider } from '@context/email-capture-context';

const FAQPage = () => {
  return (
    <EmailCaptureProvider>
      <Head />
      <Faq />
    </EmailCaptureProvider>
  );
};
export default FAQPage;
