import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function LogoColor({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Logo-1200px-No-Bkgd-min.png"
      alt="Highlands Music Festival logo"
      placeholder="none"
      className={classNames}
    />
  );
}
