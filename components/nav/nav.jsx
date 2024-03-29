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
import SubmissionsDropdown from './submissions-dropdown/submissions-dropdown';

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
  const { width } = useWindowSize();
  const isMobile = width < 1235;
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
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <HomeIcon setIsOpen={setIsOpen} />
            {navData.map(({ url, label }) => {
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
            <SubmissionsDropdown />
            <li>
              <Button href="buy-tickets" classNames={styles.buyTickets}>
                Buy Tickets
              </Button>
            </li>
            <InstagramIcon />
          </ul>
        </nav>
      ) : null}
      {isMobile && (
        <HamburgerMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          hamburgerMenuColor={hamburgerMenuColor}
        />
      )}
    </>
  );
};

export default Nav;
