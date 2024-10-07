import styles from './EmailCaptureHeader.module.scss';
import React, { useState } from 'react';
import EmailCaptureForm from 'components/shared/EmailCaptureForm/EmailCaptureForm';
import Takeover from 'components/shared/Takeover/Takeover';
import { useEmailCaptureContext } from 'context/email-capture-context';
import CloseButton from 'components/shared/CloseButton/CloseButton';
import { useWindowSize } from 'hooks';
import animations from '@animations';

export default function EmailCaptureHeader() {
  const {
    hasSubmittedForm,
    hasClosedModal,
    triggers: { CLOSE_SUBMIT_MODAL },
  } = useEmailCaptureContext();
  const { isMobile } = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    CLOSE_SUBMIT_MODAL();
    setIsOpen(false);
  };
  const animationName = isMobile ? animations.slideUp : animations.slideDown;
  return (
    <>
      {isOpen && (
        <div className={styles.emailCaptureHeader}>
          {!hasSubmittedForm && (
            <div
              className={styles.emailCaptureHeaderContainer}
              style={{ animationName }}
            >
              <div className={styles.column}>
                <p className={styles.columnCopy}>
                  Sign up for exclusive access to promotional pricing and lineup
                  announcements
                </p>
              </div>
              <div className={styles.column}>
                <EmailCaptureForm />
              </div>
              <CloseButton
                handleClick={handleClose}
                dark
                classNames={styles.emailCaptureCloseButton}
              />
            </div>
          )}
          {hasSubmittedForm && !hasClosedModal && (
            <Takeover>
              <p className={styles.thankYou}>
                Thank you! We'll be in touch soon!
              </p>
            </Takeover>
          )}
        </div>
      )}
    </>
  );
}
