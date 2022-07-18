import React from 'react';
import './hamburger-menu.scss';
import clsx from 'clsx';

export default function HamburgerMenu({
  isOpen = false,
  setIsOpen,
  hamburgerMenuColor = 'black',
}) {
  const backgroundColor = isOpen ? 'black' : hamburgerMenuColor;
  return (
    <button
      className={clsx('hamburgerMenu', isOpen ? 'open' : '')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span style={{ backgroundColor }}></span>
      <span style={{ backgroundColor }}></span>
      <span style={{ backgroundColor }}></span>
      <span style={{ backgroundColor }}></span>
    </button>
  );
}
