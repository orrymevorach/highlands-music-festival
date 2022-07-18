import React from 'react';
import Nav from '../nav';
import './layout.scss';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = '',
}) {
  return (
    <div className={hasPaddingBottom ? 'layout' : ''}>
      <Nav hamburgerMenuColor={hamburgerMenuColor} />
      {children}
    </div>
  );
}
