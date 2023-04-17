import React, { useState } from 'react';
import style from './takeover.module.scss';
import { CloseButton } from '../icons/icons';
import clsx from 'clsx';

export default function Takeover({
  children,
  styles,
  disableClose = false,
  classNames,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    !disableClose ? setIsOpen(false) : () => {};
  };

  return (
    <>
      {isOpen && (
        <div className={clsx(style.takeover, classNames)} style={styles}>
          <div className={style.overlay} onClick={handleClose}></div>
          <div className={style.modal}>
            {children}
            {!disableClose && <CloseButton handleClick={handleClose} />}
          </div>
        </div>
      )}
    </>
  );
}
