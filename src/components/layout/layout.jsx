import React, { useContext } from 'react';
import Nav from '../nav';
import './layout.scss';
import { EmailCaptureContext } from '@context/emailCaptureContext';
import { useLocation } from '@reach/router';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-footer';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = '',
}) {
  const { hasSubmitted } = useContext(EmailCaptureContext);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  return (
    <div className={hasPaddingBottom ? 'layout' : ''}>
      <Nav hamburgerMenuColor={hamburgerMenuColor} />
      {children}
      {/* Show email capture form is user is not on home page, and has not yet submitted their email */}
      {!hasSubmitted && !isHomePage ? <EmailCaptureFooter /> : ''}
    </div>
  );
}
