import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Logo from 'public/rainbow.png';
import styles from './order-confirmation.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const SuccessMessage = ({ customer }) => {
  return (
    <>
      <p className={styles.orderConfirmed}>
        Order Confirmed{' '}
        <FontAwesomeIcon icon={faCheckCircle} className={styles.checkMark} />
      </p>
      <p className={styles.bodyCopy}>Thanks for your order, {customer.name}!</p>
      <p className={clsx(styles.bodyCopy, styles.bodyCopySmall)}>
        A confirmation email has been sent to {customer.email}.
      </p>
    </>
  );
};

const ErrorMessage = () => (
  <>
    <p className={styles.bodyCopy}>No confirmation number has been provided</p>
    <p className={styles.bodyCopySmall}>
      If you are having trouble placing an order, please contact us at
      info@highlandsmusicfestival.ca.
    </p>
  </>
);
export default function OrderConfirmation({ customer, orderDetails = {} }) {
  const isOrderSuccessful = orderDetails.status === 'succeeded';
  return (
    <div className={styles.orderConfirmationContainer}>
      <Link href="/" className={styles.backLink}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Back to home page</span>
      </Link>
      <Image
        src={Logo}
        alt="Highlands Music Festival logo"
        className={styles.logo}
        priority
        quality={10}
      />
      {isOrderSuccessful ? (
        <SuccessMessage customer={customer} />
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}
