import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/index.scss';
import { imgPath } from '../utils/constants';

const IndexPage = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Highlands Music Festival</title>
        <link rel="icon" href={`${imgPath}/favicon.png`} />
      </Helmet>
      <div className="containerStyles">
        <img
          src={`${imgPath}/Logo-1200px-No-Bkgd-min.png`}
          alt="logo"
          className="logo"
        />
        <p className="location">Palmer Rapids, Ontario</p>
        <p className="date">Sept 30 - Oct 2</p>
        <p className="other">Coming soon...</p>
      </div>
    </main>
  );
};

export default IndexPage;
