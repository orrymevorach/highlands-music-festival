import React from 'react';
import EmailCaptureForm from '@components/email-capture-form';
import Nav from '../nav';
import './layout.scss';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = '',
  emailCaptureClassNames = '',
}) {
  return (
    <div className={hasPaddingBottom ? 'layout' : ''}>
      <Nav hamburgerMenuColor={hamburgerMenuColor} />
      {children}
      <EmailCaptureForm classNames={emailCaptureClassNames} />
    </div>
  );
}
