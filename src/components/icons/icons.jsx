import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import './icons.scss';
import clsx from 'clsx';

export const CloseButton = ({ handleClick, dark = false, classNames = '' }) => {
  return (
    <button
      onClick={handleClick}
      className={clsx('closeButton', dark && 'darkButton', classNames)}
    >
      <FontAwesomeIcon icon={faWindowClose} size="2x" />
    </button>
  );
};
