import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function CLDeck({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/CL-DECK-2.jpg"
      alt=""
      placeholder="blurred"
      className={classNames}
    />
  );
}
