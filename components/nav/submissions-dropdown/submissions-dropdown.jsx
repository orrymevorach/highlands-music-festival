import React, { useState } from 'react';
import styles from './submissions-dropdown.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SubmissionsDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const icon = isDropdownOpen ? faChevronUp : faChevronDown;
  function handleClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  return (
    <div className={styles.container}>
      <li className={styles.navItem} onClick={handleClick}>
        Submissions
        <FontAwesomeIcon icon={icon} size="sm" className={styles.chevron} />
      </li>
      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          <li className={styles.dropdownItem}>
            <Link href="/artist-submissions">Artist Submissions</Link>
          </li>
          {/* <li className={styles.dropdownItem}>
            <Link href="/vendor-submission">Vendor Submissions</Link>
          </li> */}
        </ul>
      )}
    </div>
  );
}
