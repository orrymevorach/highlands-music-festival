import React from 'react';
import Image from 'next/image';

export default function SwimTower({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/gallery-the-setting-11.jpg"
      alt=""
      placeholder="none"
      className={classNames}
      priority
      width={1920}
      height={890}
    />
  );
}
