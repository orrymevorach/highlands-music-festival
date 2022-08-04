import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function SwimTower({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/gallery-the-setting-11.jpg"
      alt=""
      placeholder="none"
      className={classNames}
    />
  );
}
