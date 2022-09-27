import React from 'react';
import './lineup.scss';
import { GreenSun, YellowSun } from '@images';

const lineup = [
  'Ada Lea',
  'Adria Kain',
  'Amaka',
  'Clerel',
  'Dave Borins',
  'Ellevator',
  'Erez Zobary',
  'Katie Tupper',
  'Le Ren',
  'Logan Staats',
  'Loving',
  'Mighloe',
  'Niall Mutter',
  'Shallow Alcove',
  'SORAN',
  'THe LYONZ',
  'Zenesoul',
];

const chunkLineupIntoRowsOfThree = lineup => {
  let chunkedLineup = [];
  const chunkSize = 3;
  for (let i = 0; i < lineup.length; i += chunkSize) {
    const chunk = lineup.slice(i, i + chunkSize);
    chunkedLineup.push(chunk);
  }
  return chunkedLineup;
};

const Headliners = () => (
  <div className="lineupRow headlineRow">
    <p className="heading">
      Busty <br />
      and <br />
      the <br />
      Bass
    </p>
    <GreenSun classNames="lineupSun headlineSun" />
    <p className="heading">
      The <br /> Brook <br /> & the <br /> Bluff
    </p>
  </div>
);

const Artists = () => {
  const chunkedLineup = chunkLineupIntoRowsOfThree(lineup);
  return (
    <>
      {chunkedLineup.map((chunkedRow, index) => {
        return (
          <div key={`${chunkedRow[0]}-${index}`} className="lineupRow">
            {chunkedRow.map((artist, index) => {
              const isLastArtistInRow = index === chunkedRow.length - 1;
              return (
                <div key={artist} className="artistContainer">
                  <p className="heading artist">{artist}</p>
                  {!isLastArtistInRow && <GreenSun classNames="lineupSun" />}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default function Lineup() {
  return (
    <div className="lineupContainer">
      <h2 className="heading center">Lineup</h2>
      <YellowSun classNames="lineupBackground" />
      <Headliners />
      <Artists />
    </div>
  );
}
