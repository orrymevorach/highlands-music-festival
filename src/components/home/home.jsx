import React from 'react';
import './home.scss';
import { imgPath } from '../../utils/constants';
import Icons from '../icons';
import Layout from '../layout';
import { Link } from 'gatsby';
import { useWindowSize } from '@hooks';

const Home = () => {
  const { isMobile } = useWindowSize();
  return (
    <Layout hasPaddingBottom={false}>
      <h1 className="h1">Highlands Music Festival</h1>
      <div className="mainContentContainer">
        <img
          src={`${imgPath}/Logo-1200px-No-Bkgd-min.png`}
          alt="Highlands Music Festival logo"
          className="logo"
        />

        <div className="videoContainer">
          <h2 className="date">Septemeber 30 -- October 2</h2>
          <video
            src={`${imgPath}/Walden-HighQ.mp4`}
            autoPlay
            muted
            className="video"
            loop
          ></video>
          <Link to="buy-tickets" className="buyNowButton">
            Buy Now
          </Link>
          {!isMobile && (
            <p className="ticketsAvailable">2022 tickets are now available</p>
          )}
        </div>
        <Icons />
      </div>
    </Layout>
  );
};

export default Home;
