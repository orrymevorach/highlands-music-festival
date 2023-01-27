import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import './takeover.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <button onClick={handleClose} className="closeButton">
              <FontAwesomeIcon icon={faWindowClose} size="2x" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
