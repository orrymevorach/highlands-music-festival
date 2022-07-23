import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function YellowSun({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Iconography/Iconography-02.png"
      alt=""
      placeholder="blurred"
      className={classNames}
    />
  );
}
