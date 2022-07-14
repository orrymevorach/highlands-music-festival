import React, { useState, useEffect } from 'react';
import './nav.scss';
import { Link } from 'gatsby';
import HamburgerMenu from '../hamburger-menu';
import { useWindowSize } from '@hooks';

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
    href: '/buy-tickets',
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
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useWindowSize();
  const showNav = !isMobile || (isMobile && isOpen);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
  }, [isOpen]);

  return (
    <>
      {showNav ? (
        <nav className="nav">
          <ul className="navList">
            {links.map(({ href, text }) => (
              <li key={href}>
                <Link to={href}>{text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Nav;
