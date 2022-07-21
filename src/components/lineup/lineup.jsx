import React from 'react';
import { imgPath } from '@utils/constants';
import './lineup.scss';

const lineup = [
  {
    artists: [
      { artist: 'Ada Lea' },
      { artist: 'Adria Kain' },
      { artist: 'Amaka' },
    ],
  },
  {
    artists: [
      { artist: 'Clerel' },
      { artist: 'Dave Borins' },
      { artist: 'Erez Zobary' },
    ],
  },
  {
    artists: [
      { artist: 'Housewife' },
      { artist: 'Katie Tupper' },
      { artist: 'Le Ren' },
    ],
  },
  {
    artists: [
      { artist: 'Logan Staats' },
      { artist: 'Loving' },
      { artist: 'Mighloe' },
    ],
  },
  {
    artists: [
      { artist: 'Niall Mutter' },
      { artist: 'Shallow Alcove' },
      { artist: 'SORAN' },
    ],
  },
  {
    artists: [{ artist: 'THe LYONZ' }, { artist: 'Zenesoul' }],
  },
];

export default function Lineup() {
  return (
    <div className="lineupContainer">
      <h2 className="heading center">Lineup</h2>
      <img
        src={`${imgPath}/Lineup-Banner-2.png`}
        alt=""
        className="lineupBanner"
      />
    </div>
  );
}
