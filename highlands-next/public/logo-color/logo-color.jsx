import React from 'react';
import Image from 'next/image';

export default function LogoColor({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Logo-1200px-No-Bkgd-min.png"
      alt="Highlands Music Festival logo"
      placeholder="none"
      className={classNames}
      width={150}
      height={150}
    />
  );
}
