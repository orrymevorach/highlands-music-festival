import React from 'react';
import Nav from '../nav';
import './layout.scss';

export default function Layout({ children, hasPaddingBottom = true }) {
  return (
    <div className={hasPaddingBottom ? 'layout' : ''}>
      <Nav />
      {children}
    </div>
  );
}
