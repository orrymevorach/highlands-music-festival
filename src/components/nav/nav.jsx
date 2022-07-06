import React from 'react';
import './nav.scss';
import { Link } from 'gatsby';

const links = [
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/lineupe-and-schedule',
    text: 'Lineup & Schedule',
  },
  {
    href: '/tickets',
    text: 'Buy Tickets',
  },
  {
    href: '/location-and-accommodation',
    text: 'Location & Accommodation',
  },
  {
    href: '/activities',
    text: 'Activities',
  },
  {
    href: '/faq',
    text: 'FAQ',
  },
];

const Nav = () => {
  return (
    <nav>
      <ul>
        {links.map(({ href, text }) => (
          <li>
            <Link to={href}>{text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
