import styles from './user-form.module.scss';
import { useState } from 'react';
import Input from '@mui/joy/Input';
import { useCheckoutContext } from 'context/checkout-context';
import { getStripeCustomer, createPaymentIntent } from 'lib/stripe-lib';
import Loader from 'components/loader';
import Button from 'components/shared/button';

export default function UserForm() {
  const { quantity, priceData, dispatch, actions } = useCheckoutContext();
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
    const hasSubscription = !!priceData.subscriptionInstallmentAmount;
    const amount = hasSubscription
      ? priceData.subscriptionInstallmentAmount
      : priceData.total;
    const metadata = {
      ...priceData,
      quantity,
    };
    const paymentIntent = await createPaymentIntent({
      customer,
      amount,
      metadata,
    });
    dispatch({
      type: actions.SET_PAYMENT_INTENT,
      customer,
      paymentIntent,
    });
    setIsLoading(false);
  };

  if (isLoading) return <Loader centerInContainer />;

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

      <Button>Submit</Button>
    </form>
  );
}
