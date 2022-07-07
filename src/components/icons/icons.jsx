import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import './icons.scss';

const Icons = () => {
  return (
    <div className="iconsContainer">
      <a href="#" className="icon">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a
        href="https://www.instagram.com/highlandsmusicfestival"
        className="icon"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="#" className="icon">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  );
};
export default Icons;
