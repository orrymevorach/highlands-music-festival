import React, { useState } from 'react';
import styles from './NavDropdown.module.scss';
import Link from 'next/link';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SubmissionsDropdown({ title, items }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const icon = isDropdownOpen ? faChevronUp : faChevronDown;
  function handleClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  return (
    <div className={styles.container}>
      <li className={styles.navItem} onClick={handleClick}>
        {title}
        <FontAwesomeIcon icon={icon} size="sm" className={styles.chevron} />
      </li>
      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          {items.map(({ href, label }) => (
            <li className={styles.dropdownItem} key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
