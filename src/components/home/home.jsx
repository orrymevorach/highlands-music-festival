import React from 'react';
import './home.scss';
import { imgPath } from '../../utils/constants';
import Icons from '../icons';
import Layout from '../layout';

const Home = () => {
  return (
    <Layout>
      <h1 className="h1">Highlands Music Festival</h1>
      <div className="mainContentContainer">
        <img
          src={`${imgPath}/Logo-1200px-No-Bkgd-min.png`}
          alt="Highlands Music Festival logo"
          className="logo"
        />
        <Icons />
        <div className="videoContainer">
          <h2 className="date">Septemeber 30 -- October 2</h2>
          <iframe
            className="video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/EwYiqraCygA?autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <p className="ticketsAvailable">2022 tickets are now available</p>
          <button className="buyNowButton">Buy Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
