import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './icons.scss';

const Icons = () => {
  return (
    <div className="iconsContainer">
      <a
        href="https://www.instagram.com/highlandsmusicfestival"
        className="icon"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  );
};
export default Icons;
