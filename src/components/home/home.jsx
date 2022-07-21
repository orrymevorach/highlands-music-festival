import React from 'react';
import './home.scss';
import { imgPath, colors } from '@utils/constants';
import Layout from '../layout';
import { Link } from 'gatsby';
import clsx from 'clsx';
import { useWindowSize } from '@hooks';

const TopRow = () => (
  <div className="topRow">
    <h2 className="date">Septemeber 30 - October 2</h2>
    <p className={clsx('ticketsAvailable')}>2022 tickets are now available</p>
    <Link to="buy-tickets" className={`buyNowButton`}>
      Buy Now
    </Link>
  </div>
);

const Video = () => {
  return (
    <>
      <video
        src={`${imgPath}/Walden-HighQ-cropped-v2.mp4`}
        autoPlay
        muted
        className="video"
        loop
        playsInline
      ></video>
      <div className="videoOverlay"></div>
    </>
  );
};

export default function Home() {
  const { isMobile } = useWindowSize();
  return (
    <div className="mainContentContainer">
      <Layout hasPaddingBottom={false} hamburgerMenuColor={colors.beige}>
        <h1 className="h1">Highlands Music Festival</h1>
        <div className="videoContainer">
          <div className="imageContainer">
            <img
              src={`${imgPath}/Logo-1200px-Neutral.png`}
              alt="Highlands Music Festival logo"
              className="logo"
            />
            <TopRow />
          </div>
          {!isMobile && <Video />}
        </div>
      </Layout>
    </div>
  );
}
