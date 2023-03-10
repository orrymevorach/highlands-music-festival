import React from 'react';
import Image from 'next/image';

export default function CLDeck({ classNames }) {
  return (
    <Image
      src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/CL-DECK-2.jpg"
      alt=""
      className={classNames}
      width={1415}
      height={945}
      style={{ height: '100%' }}
    />
  );
}
