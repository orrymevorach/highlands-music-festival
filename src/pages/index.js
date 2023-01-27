import React, { useState } from 'react';
import '../styles/global.scss';
import Home from '@components/home';
import Head from '@components/head';
import EmailCaptureTakeover from '@components/takeover/email-capture-takeover';

const IndexPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <>
      <Head />
      <EmailCaptureTakeover />
      <Home />
    </>
  );
};

export default IndexPage;
