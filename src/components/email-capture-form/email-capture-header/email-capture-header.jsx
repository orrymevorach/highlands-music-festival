import './email-capture-header.scss';
import React, { useState } from 'react';
import EmailCaptureForm from '@components/email-capture-form';
import Takeover from '@components/takeover';
import { useEmailCapture } from '@hooks';

export default function EmailCaptureFooter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasSubmitted = useEmailCapture();
  return (
    <>
      {!hasSubmitted && (
        <div className="emailCaptureFooter">
          {!isSubmitted ? (
            <div className="emailCaptureFooterContainer">
              <div className="column">
                <p className="columnCopy">
                  Sign up for exclusive access to early bird pricing
                </p>
              </div>
              <div className="column">
                <EmailCaptureForm handleSuccess={() => setIsSubmitted(true)} />
              </div>
            </div>
          ) : (
            <Takeover>
              <p className="thankYou">Thank you! We'll be in touch soon!</p>
            </Takeover>
          )}
        </div>
      )}
    </>
  );
}
