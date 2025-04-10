import styles from './user-form.module.scss';
import { useEffect, useState } from 'react';
import Input from '@mui/joy/Input';
import { useCheckoutContext } from 'context/checkout-context';
import {
  getStripeCustomer,
  createPaymentIntent,
  createSetupIntent,
} from 'lib/stripe-lib';
import Loader from 'components/shared/Loader/Loader';
import Button from 'components/shared/Button/Button';
import { createRecord } from 'lib/airtable-lib';
import { ErrorMessage } from 'components/CheckoutPage/checkout-shared-components';
import { validateEmail } from 'utils/utils';
import { useRouter } from 'next/router';

export default function UserForm() {
  const { priceData, dispatch, actions, subscriptionData } =
    useCheckoutContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [vendorSecondGuest, setVendorSecondGuest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsVendor(router.query.vendor === 'true');
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    const user = {
      name: `${firstName} ${lastName}`,
      email: email,
    };
    const customer = await getStripeCustomer({ user });

    const hasSubscription = router.query.installments === 'true';
    const hasDeposit = priceData.deposit;
    const amount = hasSubscription
      ? subscriptionData.subscriptionInstallmentAmount
      : hasDeposit
      ? priceData.deposit
      : priceData.total;

    let paymentIntent;
    if (hasSubscription) {
      paymentIntent = await createSetupIntent({ customer });
    } else {
      paymentIntent = await createPaymentIntent({
        customer,
        amount,
      });
    }

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

  const handleChange = ({ value, callback }) => {
    setErrorMessage('');
    callback(value);
  };

  if (isLoading) return <Loader centerInContainer />;

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <p className={styles.contactInformation}>
        {isVendor ? 'Vendor Information' : 'Guest Information'}
      </p>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className={styles.nameContainer}>
        <Input
          type="text"
          value={firstName}
          onChange={e =>
            handleChange({ value: e.target.value, callback: setFirstName })
          }
          placeholder="First Name"
          required
          fullWidth
          className={styles.firstName}
        />
        <Input
          type="text"
          value={lastName}
          onChange={e =>
            handleChange({ value: e.target.value, callback: setLastName })
          }
          placeholder="Last Name"
          required
          fullWidth
          className={styles.lastName}
        />
      </div>

      <Input
        type="email"
        value={email}
        onChange={e =>
          handleChange({ value: e.target.value, callback: setEmail })
        }
        placeholder="Email"
        required
      />

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
