import styles from './user.module.scss';
import { useState } from 'react';
import Input from '@mui/joy/Input';
import { useCheckoutContext } from 'context/checkout-context';
import { getStripeCustomer, createPaymentIntent } from 'lib/stripe-lib';
import { calculatePricing } from '../checkout-utils';
import Loader from 'components/loader';

export default function User() {
  const { customer, quantity, priceData, dispatch, actions } =
    useCheckoutContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const user = {
      name: `${firstName} ${lastName}`,
      email: email,
    };
    const customer = await getStripeCustomer({ user });
    const paymentIntent = await createPaymentIntent({
      customer,
      quantity,
      priceData,
    });
    const pricing = calculatePricing({
      initialTicketPrice: paymentIntent.amount / 100 / 1.13,
      priceData,
      quantity,
    });
    dispatch({
      type: actions.SET_PAYMENT_INTENT,
      customer,
      pricing,
      paymentIntent,
    });
    setIsLoading(false);
  };

  if (isLoading) return <Loader centerInContainer />;

  if (customer) {
    return (
      <div className={styles.submittedUserContainer}>
        <p className={styles.contactInformation}>Contact Information:</p>
        <p className={styles.name}>
          <span className={styles.left}>Name:</span>
          <span className={styles.right}>{customer.name}</span>
        </p>
        <p className={styles.email}>
          <span className={styles.left}>Email:</span>
          <span className={styles.right}>{customer.email}</span>
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
