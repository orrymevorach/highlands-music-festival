import React, { useState } from 'react';
import Takeover from '@components/takeover';
import EmailCaptureForm from '@components/email-capture-form';
import './email-capture-takeover.scss';

export default function EmailCaptureTakeover() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="emailCaptureTakeover">
      {!isSubmitted ? (
        <Takeover>
          <div className="textContainer">
            <>
              <p className="lineOne">Where Music Festival meets Summer Camp</p>
              <p className="lineTwo">
                Sign up for exclusive access to 2023 early bird pricing and
                lineup announcements
              </p>
            </>
          </div>
          <EmailCaptureForm buttonClassNames="takeoverSubmitButton" />
        </Takeover>
      ) : (
        <Takeover>
          <p className="lineOne">Thank you! We'll be in touch soon!</p>
        </Takeover>
      )}
    </div>
  );
}
