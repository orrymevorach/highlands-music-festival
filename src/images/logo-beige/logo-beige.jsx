import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function LogoBeige({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Logo-1200px-Neutral.png"
      alt=""
      placeholder="tracedSVG"
      className={classNames}
    />
  );
}
