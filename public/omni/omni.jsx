import React from 'react';
import Image from 'next/image';

export default function Omni({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/29E.jpg"
      alt=""
      className={classNames}
      width={1415}
      height={945}
      style={{ height: '100%' }}
    />
  );
}