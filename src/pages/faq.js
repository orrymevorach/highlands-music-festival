import React from 'react';
import '../styles/global.scss';
import Faq from '@components/faq/faq';
import Head from '@components/head';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-header';

const FAQPage = () => {
  return (
    <>
      <Head />
      <Faq />
      <EmailCaptureFooter />
    </>
  );
};
export default FAQPage;
