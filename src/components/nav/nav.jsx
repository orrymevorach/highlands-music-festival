import React, { useState, useEffect } from 'react';
import './nav.scss';
import { Link } from 'gatsby';
import HamburgerMenu from '../hamburger-menu';
import { useWindowSize } from '@hooks';
import clsx from 'clsx';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { colors } from '@utils/constants';

const links = [
  // {
  //   href: '/',
  //   text: 'Home',
  // },
  {
    to: '/about',
    text: 'About',
  },
  {
    to: '/lineup-and-schedule',
    text: 'Lineup & Schedule',
  },
  {
    to: 'https://www.eventbrite.ca/e/highlands-music-festival-tickets-353399967817',
    text: 'Buy Tickets',
    isAnchor: true,
  },
  {
    to: '/location-and-accommodation',
    text: 'Location & Accommodation',
  },
  // {
  //   to: '/activities',
  //   text: 'Activities',
  // },
  {
    to: '/faq',
    text: 'FAQ',
  },
];

const HomeIcon = () => {
  return (
    <li className="homeIcon">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} color={colors.darkGreen} size="xl" />
      </Link>
    </li>
  );
};

const InstagramIcon = () => {
  return (
    <li className="instagramIcon">
      <a href="https://www.instagram.com/highlandsmusicfestival">
        <FontAwesomeIcon
          icon={faInstagram}
          color={colors.darkGreen}
          size="xl"
        />
      </a>
    </li>
  );
};

const Nav = ({ hamburgerMenuColor = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState('');
  const { isMobile } = useWindowSize();
  const showNav = (isMobile !== undefined && !isMobile) || (isMobile && isOpen); // checking for undefined avoids flicker on page load

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
  }, [isOpen]);

  useEffect(() => {
    if (window?.location) {
      setPathname(window.location.pathname);
    }
  }, [pathname]);

  return (
    <>
      {showNav ? (
        <nav className="nav">
          <ul className="navList">
            <HomeIcon />
            {links.map(({ to, text, isAnchor = false }) => (
              <li key={to} className={clsx(to === pathname && 'active')}>
                {isAnchor ? (
                  <a href={to} target="_blank">
                    {text}
                  </a>
                ) : (
                  <Link to={to}>{text}</Link>
                )}
              </li>
            ))}
            <InstagramIcon />
          </ul>
        </nav>
      ) : null}
      <HamburgerMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hamburgerMenuColor={hamburgerMenuColor}
      />
    </>
  );
};

export default Nav;
