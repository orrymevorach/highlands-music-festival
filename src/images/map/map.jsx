import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function Map({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/MAP/map-dark.jpg"
      alt=""
      placeholder="blurred"
      className={classNames}
    />
  );
}
