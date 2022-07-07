import * as React from 'react';
import { Helmet } from 'react-helmet';
import Home from '../components/home';
import { imgPath } from '../utils/constants';
import AboutPage from './about';
import { Router } from '@gatsbyjs/reach-router';
import LineupAndSchedule from './lineup-and-schedule';
import LocationAndAccommodation from './location-and-accommodation';

const IndexPage = () => {
  return (
    <main>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Highlands Music Festival is a music festival taking place at Camp Walden in Palmer Rapids, Ontario, between September 30 and October 2 2022"
        />
        <title>Highlands Music Festival</title>
        <link rel="icon" href={`${imgPath}/favicon.png`} />
      </Helmet>
      <Router>
        <Home path="/" />
        <AboutPage path="about" />
        {/* <LineupAndSchedule path="lineup-and-schedule" /> */}
        <LocationAndAccommodation path="location-and-accommodation" />
      </Router>
    </main>
  );
};

export default IndexPage;
