import React from 'react';
import '../styles/global.scss';
import Home from '@components/home';
import Head from '@components/head';
import EmailCaptureTakeover from '@components/email-capture-form/email-capture-takeover';
import { useEmailCapture } from '@hooks';

const IndexPage = () => {
  const hasSubmitted = useEmailCapture();
  return (
    <>
      <Head />
      <Home />
      {!hasSubmitted && <EmailCaptureTakeover />}
    </>
  );
};

export default IndexPage;
