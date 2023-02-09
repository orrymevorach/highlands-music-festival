import React from 'react';
import Nav from '../nav';
import './layout.scss';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = '',
  hasMarginTop = true,
}) {
  return (
    <div className={hasPaddingBottom ? 'layout' : ''}>
      {hasMarginTop ? (
        <div className="layoutMarginTop">
          <Nav hamburgerMenuColor={hamburgerMenuColor} />
          {children}
        </div>
      ) : (
        <>
          <Nav hamburgerMenuColor={hamburgerMenuColor} />
          {children}
        </>
      )}
    </div>
  );
}
