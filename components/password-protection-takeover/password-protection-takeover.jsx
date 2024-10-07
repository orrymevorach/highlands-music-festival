import { useState } from 'react';
import Takeover from 'components/shared/Takeover/Takeover';
import styles from './password-protection-takeover.module.scss';
import Input from '@mui/joy/Input';
import Button from 'components/shared/Button/Button';
import { ErrorMessage } from 'components/checkout/checkout-shared-components';

export default function PasswordProtectionTakeover({
  setShowPasswordProtectionTakeover,
}) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (password === 'wildrivers2023') {
      setShowPasswordProtectionTakeover(false);
    } else {
      setErrorMessage('Incorrect password');
    }
  }

  function handleChange(e) {
    setErrorMessage('');
    setPassword(e.target.value);
  }
  return (
    <Takeover disableClose>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="password">
          Enter password
        </label>
        {errorMessage && (
          <ErrorMessage message={errorMessage} classNames={styles.error} />
        )}

        <Input
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <Button>Submit</Button>
      </form>
    </Takeover>
  );
}
