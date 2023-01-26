import React from 'react';
import './home.scss';
import { imgPath, colors } from '@utils/constants';
import Layout from '../layout';
import { useWindowSize } from '@hooks';

const TopRow = () => (
  <div className="topRow">
    {/* <h2 className="date">Septemeber 30 - October 2</h2>
    <p className="ticketsAvailable">2022 tickets are now available</p>
    <a
      href="https://www.eventbrite.ca/e/highlands-music-festival-tickets-353399967817"
      className="buyNowButton"
      target="_blank"
      rel="noreferrer"
    >
      Buy Now
    </a> */}
    <p className="ticketsAvailable">
      See you in 2023! Thursday, September 28th - Sunday, October 1st, 2023
    </p>
  </div>
);

const Video = () => {
  return (
    <>
      <video
        // src={`${imgPath}/Walden-HighQ-cropped-v2.mp4`}
        src={`${imgPath}/highlands-teaser-video.mp4`}
        autoPlay
        muted
        className="video"
        loop
        playsInline
      ></video>
      {/* <div className="videoOverlay"></div> */}
    </>
  );
};

export default function Home() {
  const { isMobile } = useWindowSize();
  return (
    <div className="homePageContainer">
      <Layout hasPaddingBottom={false} hamburgerMenuColor={colors.beige}>
        <main>
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
        </main>
      </Layout>
    </div>
  );
}
