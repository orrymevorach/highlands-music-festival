import * as React from 'react';
import { Helmet } from 'react-helmet';

const IndexPage = () => {
  const containerStyles = {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    height: '100vh',
  };
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Highlands Music Festival</title>
      </Helmet>
      <div style={containerStyles}>
        <h1>More information coming soon..</h1>
      </div>
    </main>
  );
};

export default IndexPage;
