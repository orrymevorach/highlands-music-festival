import React from 'react';
import Image from 'next/image';

export default function Hammocks({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/CL-HAMMOCK.jpg"
      alt=""
      className={classNames}
      width={1920}
      height={1280}
    />
  );
}
