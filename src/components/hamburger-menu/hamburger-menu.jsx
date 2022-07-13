import React, { useState } from 'react';
import './hamburger-menu.scss';
import clsx from 'clsx';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
