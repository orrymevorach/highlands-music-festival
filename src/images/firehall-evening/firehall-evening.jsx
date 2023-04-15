import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function FirehallEvening({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/EVENING-SET-UP-FIREHALL.jpg"
      alt=""
      placeholder="blurred"
      className={classNames}
    />
  );
}
