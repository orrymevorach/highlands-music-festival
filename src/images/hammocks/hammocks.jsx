import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import clsx from 'clsx';

export default function Hammocks({ classNames }) {
  return (
    <StaticImage
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/CL-HAMMOCK.jpg"
      alt=""
      placeholder="blurred"
      className={clsx(classNames)}
    />
  );
}
