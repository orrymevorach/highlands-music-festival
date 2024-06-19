import styles from './user-form.module.scss';
import { useState } from 'react';
import Input from '@mui/joy/Input';
import { useCheckoutContext } from 'context/checkout-context';
import { getStripeCustomer, createPaymentIntent } from 'lib/stripe-lib';
import Loader from 'components/loader';
import Button from 'components/shared/button';
import { Checkbox } from '@mui/material';
import { createRecord } from 'lib/airtable-lib';

export default function UserForm() {
  const { quantity, priceData, dispatch, actions } = useCheckoutContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [vendorSecondGuest, setVendorSecondGuest] = useState('');

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

    // Add to marketing list for abandoned cart email
    if (!isVendor) {
      await createRecord({
        tableId: 'Marketing',
        newFields: {
          Name: `${firstName} ${lastName}`,
          Status: 'Subscribed',
          'Email Address': email,
          'Abandoned Cart Email': 'Pending',
          'Has Ticket': 'False',
        },
      });
    }
    dispatch({
      type: actions.SET_PAYMENT_INTENT,
      customer,
      paymentIntent,
      vendorName,
      vendorSecondGuest,
    });
    setIsLoading(false);
  };

  if (isLoading) return <Loader centerInContainer />;

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <p className={styles.contactInformation}>Guest Information</p>
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

      <div className={styles.checkboxContainer}>
        <Checkbox
          value={isVendor}
          onChange={() => setIsVendor(!isVendor)}
          name="vendor-checkbox"
          id="vendor-checkbox"
          className={styles.checkbox}
        />
        <label htmlFor="vendor-checkbox" className={styles.checkboxLabel}>
          I am a vendor
        </label>
      </div>
      {isVendor && (
        <div>
          <Input
            type="text"
            value={vendorName}
            onChange={e => setVendorName(e.target.value)}
            placeholder="Business Name"
            required
            fullWidth
            className={styles.businessInput}
          />
          <Input
            type="text"
            value={vendorSecondGuest}
            onChange={e => setVendorSecondGuest(e.target.value)}
            placeholder="Full Name of Second Guest"
          />
        </div>
      )}

      <Button>Submit</Button>
    </form>
  );
}
