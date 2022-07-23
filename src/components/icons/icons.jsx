import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './icons.scss';

const Icons = () => {
  return (
    <a href="https://www.instagram.com/highlandsmusicfestival" className="icon">
      <FontAwesomeIcon icon={faInstagram} />
    </a>
  );
};
export default Icons;
