import React from 'react';
import '../styles/global.scss';
import Head from '@components/head';
import Schedule from '@components/schedule';
import Lineup from '@components/lineup';
import Layout from '@components/layout';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-header';

const LineupAndSchedule = () => {
  return (
    <>
      <Head />
      <Layout>
        <main>
          <Lineup />
          <Schedule />
        </main>
        <EmailCaptureFooter />
      </Layout>
    </>
  );
};
export default LineupAndSchedule;
