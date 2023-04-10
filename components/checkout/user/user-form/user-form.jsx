import styles from './user-form.module.scss';
import { useState } from 'react';
import Input from '@mui/joy/Input';
import { useCheckoutContext } from 'context/checkout-context';
import { getStripeCustomer, createPaymentIntent } from 'lib/stripe-lib';
import { calculatePricing } from 'components/checkout/checkout-utils';
import Loader from 'components/loader';
import { SubmitButton } from 'components/checkout/checkout-shared-components';

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

      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}
