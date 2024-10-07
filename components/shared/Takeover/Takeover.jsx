import React, { useEffect, useRef, useState } from 'react';
import style from './Takeover.module.scss';
import CloseButton from 'components/shared/CloseButton/CloseButton';
import clsx from 'clsx';

export default function Takeover({
  children,
  styles,
  handleClose,
  showTakeover,
  classNames = '',
  modalClassNames = '',
  disableClose = false,
  isCloseButtonDark = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'unset';
    handleClose ? handleClose() : setIsModalOpen(false);
  };

  // Stop scroll of page only if modal content is shorter than the rest of the page
  const takeoverRef = useRef();
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const takeoverHeight = takeoverRef.current?.clientHeight;
    const body = document.getElementsByTagName('body')[0];
    if (windowHeight >= takeoverHeight) {
      body.style.overflow = 'hidden';
    }
    return () => {
      body.style.overflow = 'visible';
    };
  }, []);

  const isOpen = showTakeover ? showTakeover : isModalOpen;

  const modalRef = useRef();
  const [alignCenter, setAlignCenter] = useState(true);
  const setModalHeight = () => {
    const windowHeight = window.innerHeight;
    const modalHeight = modalRef.current?.clientHeight;
    if (modalHeight > windowHeight) {
      setAlignCenter(false);
    } else {
      setAlignCenter(true);
    }
  };
  // If modal is shorter than window height, center it veritcally, otherwise align it near top of page
  useEffect(() => {
    // The timeout helps when a modal has an image and takes an extra bit of time to load
    setTimeout(() => {
      if (modalRef?.current) {
        setModalHeight();
      }
    }, 500);
  }, [modalRef]);

  // This is specifically helpful for mobile, when phone is rotated between portrait and landscape
  useEffect(() => {
    window.addEventListener('resize', setModalHeight);
    return () => window.removeEventListener('resize', setModalHeight);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className={clsx(style.takeover, classNames)}
          style={{
            alignItems: alignCenter ? 'center' : 'flex-start',
            ...styles,
          }}
          ref={takeoverRef}
        >
          <div className={style.overlay} onClick={closeModal}></div>
          <div className={clsx(style.modal, modalClassNames)} ref={modalRef}>
            {children}
            {!disableClose && (
              <CloseButton handleClick={closeModal} dark={isCloseButtonDark} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
