import React from 'react';
import Nav from '../nav';
import './layout.scss';
import EmailCaptureHeader from '@components/email-capture-form/email-capture-header';
import { useEmailCaptureContext } from '../../context/email-capture-context';
import clsx from 'clsx';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = '',
}) {
  const { hasSubmittedForm } = useEmailCaptureContext();
  return (
    <div
      className={clsx(
        hasPaddingBottom ? 'layout' : '',
        hasSubmittedForm ? '' : 'layoutMarginTop'
      )}
    >
      <Nav hamburgerMenuColor={hamburgerMenuColor} />
      {children}
      <EmailCaptureHeader />
    </div>
  );
}
