import React from 'react';
import { imgPath } from '../utils/constants';

const TeaserPage = () => {
  return (
    <div className="containerStyles">
      <img
        src={`${imgPath}/Logo-1200px-No-Bkgd-min.png`}
        alt="Highlands Music Festival logo"
        className="logo"
      />
      <p className="location">Palmer Rapids, Ontario</p>
      <p className="date">Sept 30 - Oct 2</p>
      <p className="other">Coming soon...</p>
    </div>
  );
};

export default TeaserPage;
