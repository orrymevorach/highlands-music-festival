import React, { useState, useEffect } from 'react';
import styles from './Nav.module.scss';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import clsx from 'clsx';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { colors, PAGE_SLUGS } from 'utils/constants';
import { useNavContext } from 'context/nav-context';
import Button from 'components/shared/Button/Button';
import NavDropdown from './NavDropdown/NavDropdown';

const HomeIcon = ({ setIsOpen }) => {
  return (
    <li className={styles.homeIcon} onClick={() => setIsOpen(false)}>
      <Link href="/">
        <FontAwesomeIcon icon={faHome} color={colors.darkGreen} size="2x" />
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
          size="2x"
        />
      </a>
    </li>
  );
};

const Nav = () => {
  const navData = useNavContext() || [];
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState('');

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
      {isOpen ? (
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
            <NavDropdown
              title="Photo Gallery"
              items={[
                {
                  href: '/photos/2023',
                  label: '2023',
                },
                {
                  href: '/photos/2024',
                  label: '2024',
                },
              ]}
            />
            <NavDropdown
              title="Submissions"
              items={[
                {
                  href: PAGE_SLUGS.ARTIST_SUBMISSIONS,
                  label: 'Artist Submissions',
                },
                {
                  href: PAGE_SLUGS.VENDOR_SUBMISSION,
                  label: 'Vendor Submissions',
                },
              ]}
            />
            <li>
              <Button
                href={PAGE_SLUGS.BUY_TICKETS}
                classNames={styles.buyTickets}
              >
                Buy Tickets
              </Button>
            </li>
            <InstagramIcon />
          </ul>
        </nav>
      ) : null}
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Nav;
