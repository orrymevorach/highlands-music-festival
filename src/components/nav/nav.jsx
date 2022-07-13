import React from 'react';
import './nav.scss';
import { Link } from 'gatsby';
import HamburgerMenu from '../hamburger-menu';

const links = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/lineup-and-schedule',
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
  // {
  //   href: '/activities',
  //   text: 'Activities',
  // },
  // {
  //   href: '/faq',
  //   text: 'FAQ',
  // },
];

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="navList">
        {links.map(({ href, text }) => (
          <li key={href}>
            <Link to={href}>{text}</Link>
          </li>
        ))}
      </ul>
      <HamburgerMenu />
    </nav>
  );
};

export default Nav;
