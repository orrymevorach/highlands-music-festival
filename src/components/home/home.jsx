import React from 'react';
import './home.scss';
import { imgPath } from '@utils/constants';
import Icons from '@components/Icons';
import Layout from '@components/layout';
import { Link } from 'gatsby';
import clsx from 'clsx';
import { useWindowSize } from '@hooks';

const BottomRow = () => {
  const { height, isMobile } = useWindowSize();
  const isBottomRowUnderneathVideo = !isMobile && height > 730;

  return (
    <div className="bottomRow">
      <p
        className={clsx(
          'ticketsAvailable',
          isBottomRowUnderneathVideo && 'darkGreen'
        )}
      >
        2022 tickets are now available
      </p>
      <Link to="buy-tickets" className={`buyNowButton`}>
        Buy Now
      </Link>
      <div className="iconsContainer">
        <Icons />
      </div>
    </div>
  );
};

const Home = () => {
  const { isMobile } = useWindowSize();
  const imagePath = isMobile
    ? 'Logo-1200px-No-Bkgd-min'
    : 'Logo-1200px-Neutral';
  return (
    <div className="mainContentContainer">
      <Layout hasPaddingBottom={false}>
        <h1 className="h1">Highlands Music Festival</h1>
        <div className="videoContainer">
          <div className="videoTextContainer">
            <img
              src={`${imgPath}/${imagePath}.png`}
              alt="Highlands Music Festival logo"
              className="logo"
            />
            <h2 className="date">Septemeber 30 - October 2</h2>
          </div>
          <video
            src={`${imgPath}/Walden-HighQ-cropped-v2.mp4`}
            autoPlay
            muted
            className="video"
            loop
          />
        </div>
        <BottomRow />
      </Layout>
    </div>
  );
};

export default Home;
