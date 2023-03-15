import React from 'react';
import Image from 'next/image';

export default function Map({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/MAP/map-dark.jpg"
      alt=""
      className={classNames}
      width={1280}
      height={945}
    />
  );
}
