import React from 'react';
import './lineup.scss';
import { GreenSun } from '@images';

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
      { artist: 'Danny Del' },
      { artist: 'Dave Borins' },
    ],
  },
  {
    artists: [
      { artist: 'Ellevator' },
      { artist: 'Erez Zobary' },
      { artist: 'Katie Tupper' },
    ],
  },
  {
    artists: [
      { artist: 'Le Ren' },
      { artist: 'Logan Staats' },
      { artist: 'Loving' },
    ],
  },
  {
    artists: [
      { artist: 'Mighloe' },
      { artist: 'Niall Mutter' },
      { artist: 'Shallow Alcove' },
    ],
  },
  {
    artists: [
      { artist: 'SORAN' },
      { artist: 'THe LYONZ' },
      { artist: 'Zenesoul' },
    ],
  },
];

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

const BackgroundImage = () => (
  <img
    src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/Iconography/Iconography-02.png"
    alt=""
    className="lineupBackground"
  />
);

const Artists = () => (
  <>
    {lineup.map(({ artists }, index) => (
      <div key={`${artists[0]}-${index}`} className="lineupRow">
        {artists.map(({ artist }) => {
          return (
            <div key={artist} className="artistContainer">
              <p className="heading artist">{artist}</p>
              <GreenSun classNames="lineupSun" />
            </div>
          );
        })}
      </div>
    ))}
  </>
);

export default function Lineup() {
  return (
    <div className="lineupContainer">
      <h2 className="heading center">Lineup</h2>
      <BackgroundImage />
      <Headliners />
      <Artists />
    </div>
  );
}
