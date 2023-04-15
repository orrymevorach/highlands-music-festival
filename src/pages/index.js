import React from 'react';
import '../styles/global.scss';
import Home from '@components/home';
import Head from '@components/head';
import { EmailCaptureProvider } from '@context/email-capture-context';

const IndexPage = () => {
  return (
    <EmailCaptureProvider>
      <Head />
      <Home />
    </EmailCaptureProvider>
  );
};

export default IndexPage;
