import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import './takeover.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailCaptureForm from '@components/email-capture-form';

export default function Takeover() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {isOpen && (
        <div className="takeover">
          <div className="overlay" onClick={handleClose}></div>
          <div className="modal">
            <div className="textContainer">
              {!isSubmitted && (
                <>
                  <p className="lineOne">
                    Join us for an unforgettable festival!
                  </p>
                  <p>
                    Submit your email for exclusive access to early bird
                    pricing.
                  </p>
                </>
              )}
            </div>
            <EmailCaptureForm
              classNames="takeover"
              handleSuccess={() => setIsSubmitted(true)}
            />

            <button onClick={handleClose} className="closeButton">
              <FontAwesomeIcon icon={faWindowClose} size="2x" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
