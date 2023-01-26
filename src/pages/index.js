import * as React from 'react';
import '../styles/global.scss';
import Home from '@components/home';
import Head from '@components/head';
import Takeover from '@components/takeover';

const IndexPage = () => {
  return (
    <>
      <Head />
      <Takeover />
      <Home />
    </>
  );
};

export default IndexPage;
