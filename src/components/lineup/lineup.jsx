import React from 'react';
import { imgPath } from '@utils/constants';
import './lineup.scss';

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
