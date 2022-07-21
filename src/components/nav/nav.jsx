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
  {
    href: '/faq',
    text: 'FAQ',
  },
];

const HomeIcon = () => {
  return (
    <li>
      <Link className="homeIcon" to="/">
        <FontAwesomeIcon icon={faHome} color={colors.darkGreen} size="xl" />
      </Link>
    </li>
  );
};

const InstagramIcon = () => {
  return (
    <li>
      <a
        href="https://www.instagram.com/highlandsmusicfestival"
        className="instagramIcon"
      >
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
  const showNav = !isMobile || (isMobile && isOpen);

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
            {links.map(({ href, text }) => (
              <li key={href} className={clsx(href === pathname && 'active')}>
                <Link to={href}>{text}</Link>
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
