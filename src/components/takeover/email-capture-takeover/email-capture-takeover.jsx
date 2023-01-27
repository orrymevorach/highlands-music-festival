import React, { useState } from 'react';
import Takeover from '@components/takeover';
import EmailCaptureForm from '@components/email-capture-form';
import './email-capture-takeover.scss';

export default function EmailCaptureTakeover() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <>
      {!isSubmitted ? (
        <Takeover>
          <div className="textContainer">
            <>
              <p className="lineOne">Join us for an unforgettable festival!</p>
              <p>
                Submit your email for exclusive access to early bird pricing.
              </p>
            </>
          </div>
          <EmailCaptureForm
            handleSuccess={() => setIsSubmitted(true)}
            classNames="takeoverEmailCapture"
          />
        </Takeover>
      ) : (
        <Takeover>
          <div className="textContainer">
            <p className="lineOne">Thank you! You will hear from us shortly.</p>
          </div>
        </Takeover>
      )}
    </>
  );
}
