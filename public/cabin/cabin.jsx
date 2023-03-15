import React from 'react';
import Image from 'next/image';

export default function Cabin({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/gallery-the-setting-6.jpg"
      alt=""
      placeholder="Picture of a cabin"
      className={classNames}
      width={150}
      height={150}
    />
  );
}
