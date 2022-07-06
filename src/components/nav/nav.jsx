import React from 'react';
import './nav.scss';
import { Link } from '@reach/router';

const Nav = () => {
  return (
    <nav>
      <ul>
        <Link to="about">
          <li>About</li>
        </Link>
        <li>Lineup & Schedule</li>
        <li>Buy Tickets</li>
        <li>Location & Accommodation</li>
        <li>Acitivities</li>
        <li>FAQ</li>
      </ul>
    </nav>
  );
};

export default Nav;
