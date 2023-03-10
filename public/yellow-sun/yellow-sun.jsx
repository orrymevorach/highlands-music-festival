import React from 'react';
import Image from 'next/image';

export default function YellowSun({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Iconography/Iconography-02.png"
      alt=""
      className={classNames}
      width={1184}
      height={620}
    />
  );
}
