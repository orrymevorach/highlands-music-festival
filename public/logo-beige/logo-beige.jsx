import React from 'react';
import Image from 'next/image';

export default function LogoBeige({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Logo-1200px-Neutral.png"
      alt=""
      placeholder="tracedSVG"
      className={classNames}
      width={150}
      height={150}
    />
  );
}
