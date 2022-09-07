import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function Cabin({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/gallery-the-setting-6.jpg"
      alt=""
      placeholder="Picture of a cabin"
      className={classNames}
    />
  );
}
