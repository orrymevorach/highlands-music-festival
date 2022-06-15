import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/index.scss';

const IndexPage = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Highlands Music Festival</title>
      </Helmet>
      <div className="containerStyles">
        <img
          src="https://highlands-orry.s3.ca-central-1.amazonaws.com/Logo-1200px-No-Bkgd.png"
          alt="logo"
          className="logo"
        />
        <p className="date">Sept 30 - Oct 2</p>
      </div>
    </main>
  );
};

export default IndexPage;
