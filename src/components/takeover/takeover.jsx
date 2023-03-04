import React, { useState } from 'react';
import './takeover.scss';
import { CloseButton } from '../icons/icons';

export default function Takeover({ children, styles }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {isOpen && (
        <div className="takeover" style={styles}>
          <div className="overlay" onClick={handleClose}></div>
          <div className="modal">
            {children}
            <CloseButton handleClick={handleClose} />
          </div>
        </div>
      )}
    </>
  );
}
