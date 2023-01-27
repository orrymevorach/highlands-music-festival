import React, { useContext } from 'react';
import EmailCaptureForm from '@components/email-capture-form';
import Nav from '../nav';
import './layout.scss';
import { EmailCaptureContext } from '@context/emailCaptureContext';
import { useLocation } from '@reach/router';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = '',
  emailCaptureClassNames = '',
}) {
  const { hasSubmitted } = useContext(EmailCaptureContext);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  return (
    <div className={hasPaddingBottom ? 'layout' : ''}>
      <Nav hamburgerMenuColor={hamburgerMenuColor} />
      {children}
      {/* Show email capture form is user is not on home page, and has not yet submitted their email */}
      {!hasSubmitted && !isHomePage ? (
        <EmailCaptureForm classNames={emailCaptureClassNames} />
      ) : (
        ''
      )}
    </div>
  );
}
