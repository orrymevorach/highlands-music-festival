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
import { useNavContext } from 'context/nav-context';
import Button from 'components/shared/button/button';

const HomeIcon = ({ setIsOpen }) => {
  return (
    <li className={styles.homeIcon} onClick={() => setIsOpen(false)}>
      <Link href="/">
        <FontAwesomeIcon icon={faHome} color={colors.darkGreen} size="xl" />
      </Link>
    </li>
  );
};

const InstagramIcon = () => {
  return (
    <li className={styles.instagramIcon}>
      <a
        href="https://www.instagram.com/highlandsmusicfestival"
        target="_blank"
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
  const navData = useNavContext() || [];
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
            <HomeIcon setIsOpen={setIsOpen} />
            {navData.map(({ url, label }) => {
              const isBuyTicketsButton = label === 'Buy Tickets';
              if (isBuyTicketsButton) {
                return (
                  <li>
                    <Button href={url} classNames={styles.buyTickets}>
                      {label}
                    </Button>
                  </li>
                );
              }
              return (
                <li
                  key={url}
                  className={clsx(
                    url === pathname && styles.active,
                    styles.link
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={url}>{label}</Link>
                </li>
              );
            })}
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
