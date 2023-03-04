import './email-capture-header.scss';
import React from 'react';
import EmailCaptureForm from '@components/email-capture-form';
import Takeover from '@components/takeover';
import { useEmailCaptureContext } from '@context/email-capture-context';

export default function EmailCaptureHeader() {
  const { hasSubmittedForm, hasClosedModal } = useEmailCaptureContext();
  return (
    <div className="emailCaptureHeader">
      {!hasSubmittedForm && (
        <div className="emailCaptureHeaderContainer">
          <div className="column">
            <p className="columnCopy">
              Sign up for exclusive access to early bird pricing
            </p>
          </div>
          <div className="column">
            <EmailCaptureForm />
          </div>
        </div>
      )}
      {hasSubmittedForm && !hasClosedModal && (
        <Takeover>
          <p className="thankYou">Thank you! We'll be in touch soon!</p>
        </Takeover>
      )}
    </div>
  );
}
