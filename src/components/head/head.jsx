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
        content="Highlands Music Festival is a music festival taking place at Camp Walden in Palmer Rapids, Ontario, between Thursday, September 28th - Sunday, October 1st, 2023"
      />
      <title>Highlands Music Festival</title>
      <link rel="icon" href={`${imgPath}/favicon.png`} />
    </Helmet>
  );
}
