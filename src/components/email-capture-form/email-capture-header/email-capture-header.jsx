import './email-capture-header.scss';
import React, { useState } from 'react';
import EmailCaptureForm from '@components/email-capture-form';
import Takeover from '@components/takeover';
import { useEmailCaptureContext } from '@context/email-capture-context';
import { CloseButton } from '../../icons/icons';

export default function EmailCaptureHeader() {
  const {
    hasSubmittedForm,
    hasClosedModal,
    triggers: { CLOSE_SUBMIT_MODAL },
  } = useEmailCaptureContext();
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    CLOSE_SUBMIT_MODAL();
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
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
              <CloseButton
                handleClick={handleClose}
                dark
                classNames="emailCaptureCloseButton"
              />
            </div>
          )}
          {hasSubmittedForm && !hasClosedModal && (
            <Takeover>
              <p className="thankYou">Thank you! We'll be in touch soon!</p>
            </Takeover>
          )}
        </div>
      )}
    </>
  );
}
