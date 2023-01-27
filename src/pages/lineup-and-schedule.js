import React from 'react';
import '../styles/global.scss';
import Head from '@components/head';
import Schedule from '@components/schedule';
import Lineup from '@components/lineup';
import Layout from '@components/layout';
import { EmailCaptureProvider } from '../context/emailCaptureContext';

const LineupAndSchedule = () => {
  return (
    <EmailCaptureProvider>
      <Head />
      <Layout>
        <main>
          <Lineup />
          <Schedule />
        </main>
      </Layout>
    </EmailCaptureProvider>
  );
};
export default LineupAndSchedule;
