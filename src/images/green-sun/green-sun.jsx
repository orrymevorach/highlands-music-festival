import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import './green-sun.scss';
import clsx from 'clsx';

export default function GreenSun({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Iconography/Iconography-03.png"
      alt=""
      placeholder="blurred"
      className={clsx('sun', classNames)}
    />
  );
}
