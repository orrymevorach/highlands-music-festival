import React, { useState, useEffect } from 'react';
import styles from './nav.module.scss';
import Link from 'next/link';
import HamburgerMenu from '../hamburger-menu';
import { useWindowSize } from 'hooks';
import clsx from 'clsx';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { colors } from 'utils/constants';

const links = [
  {
    to: '/about',
    text: 'About',
  },
  // {
  //   to: '/lineup-and-schedule',
  //   text: 'Lineup & Schedule',
  // },
  // {
  //   to: 'https://www.eventbrite.ca/e/highlands-music-festival-tickets-353399967817',
  //   to: 'https://www.eventbrite.ca/e/highlands-music-festival-tickets-525480736027?utm-campaig[…]utm-medium=discovery&utm-term=listing&utm-source=cp&aff=escb',
  //   text: 'Buy Tickets',
  //   isAnchor: true,
  // },
  {
    to: '/location-and-accommodation',
    text: 'Location & Accommodation',
  },
  {
    to: '/activities',
    text: 'Activities',
  },
  {
    to: '/committee',
    text: 'Who We Are',
  },
  {
    to: '/faq',
    text: 'FAQ',
  },
];

const HomeIcon = () => {
  return (
    <li className={styles.homeIcon}>
      <Link href="/">
        <FontAwesomeIcon icon={faHome} color={colors.darkGreen} size="xl" />
      </Link>
    </li>
  );
};

const InstagramIcon = () => {
  return (
    <li className={styles.instagramIcon}>
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
  const { isMobile, isDesktop, isTablet } = useWindowSize();
  const showNav = isDesktop || isTablet || (isMobile && isOpen);

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
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <HomeIcon />
            {links.map(({ to, text, isAnchor = false }) => (
              <li key={to} className={clsx(to === pathname && styles.active)}>
                {isAnchor ? (
                  <a href={to} target="_blank" rel="noreferrer">
                    {text}
                  </a>
                ) : (
                  <Link href={to}>{text}</Link>
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