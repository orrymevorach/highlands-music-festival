import styles from './user.module.scss';
import { useState } from 'react';
import Input from '@mui/joy/Input';
import { useCheckoutContext } from 'context/checkout-context';
import Loader from 'components/loader/loader';

export default function User() {
  const { user, setUser } = useCheckoutContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        name: `${firstName} ${lastName}`,
        email,
      });
    }, 500);
  };
  if (isLoading) return <Loader centerInContainer />;

  const hasUser = user.name && user.email;
  if (hasUser) {
    return (
      <div className={styles.submittedUserContainer}>
        <p className={styles.contactInformation}>Contact Information:</p>
        <p className={styles.name}>
          <span className={styles.left}>Name:</span>
          <span className={styles.right}>{user.name}</span>
        </p>
        <p className={styles.email}>
          <span className={styles.left}>Email:</span>
          <span className={styles.right}>{user.email}</span>
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <p className={styles.contactInformation}>Contact Information</p>
      <div className={styles.nameContainer}>
        <Input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          fullWidth
          className={styles.firstName}
        />
        <Input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
          required
          fullWidth
          className={styles.lastName}
        />
      </div>

      <Input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}
