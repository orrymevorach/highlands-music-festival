import React from 'react';
import './hamburger-menu.scss';
import clsx from 'clsx';

export default function HamburgerMenu({ isOpen = false, setIsOpen }) {
  return (
    <button
      className={clsx('hamburgerMenu', isOpen ? 'open' : '')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
