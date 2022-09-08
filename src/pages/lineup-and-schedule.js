import React from 'react';
import '../styles/global.scss';
import Head from '@components/head';
import Schedule from '@components/schedule';
import Lineup from '@components/lineup';
import Layout from '@components/layout';

const LineupAndSchedule = () => {
  return (
    <>
      <Head />
      <Layout>
        <main>
          <Lineup />
          <Schedule />
        </main>
      </Layout>
    </>
  );
};
export default LineupAndSchedule;
