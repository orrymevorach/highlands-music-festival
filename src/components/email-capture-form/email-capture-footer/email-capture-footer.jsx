import './email-capture-footer.scss';
import React, { useState } from 'react';
import EmailCaptureForm from '@components/email-capture-form';
import Takeover from '@components/takeover';

export default function EmailCaptureFooter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="emailCaptureFooter">
      {!isSubmitted ? (
        <div className="emailCaptureFooterContainer">
          <div className="column">
            <p className="columnCopy">
              Submit your email for exclusive access to early bird pricing
            </p>
          </div>
          <div className="column">
            <EmailCaptureForm handleSuccess={() => setIsSubmitted(true)} />
          </div>
        </div>
      ) : (
        <Takeover>
          <p className="thankYou">Thank you! You will hear from us shortly.</p>
        </Takeover>
      )}
    </div>
  );
}
