import React from 'react';
import '../styles/global.scss';
import Schedule from '../components/schedule';
import Lineup from '../components/lineup';
import Layout from '../components/layout';

const LineupAndSchedule = () => {
  return (
    <Layout>
      <Schedule />
      <Lineup />
    </Layout>
  );
};
export default LineupAndSchedule;
