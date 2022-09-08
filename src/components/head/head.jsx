import React from 'react';
import { Helmet } from 'react-helmet';
import { imgPath } from '@utils/constants';

export default function Head() {
  return (
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
  );
}
