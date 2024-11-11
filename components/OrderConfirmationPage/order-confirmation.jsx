import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Logo from 'public/rainbow-min.png';
import styles from './order-confirmation.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const SuccessMessage = ({ user }) => {
  return (
    <>
      <p className={styles.orderConfirmed}>
        Order Confirmed{' '}
        <FontAwesomeIcon icon={faCheckCircle} className={styles.checkMark} />
      </p>
      <p className={styles.bodyCopy}>Thanks for your order, {user.name}!</p>
      <p className={clsx(styles.bodyCopy, styles.bodyCopySmall)}>
        A confirmation email has been sent to {user.emailAddress}.
      </p>
    </>
  );
};

const ErrorMessage = () => (
  <>
    <p className={styles.bodyCopy}>
      Apologies, we do not not have a record of this order
    </p>
    <p className={styles.bodyCopySmall}>
      If you are having trouble placing an order, please contact us at
      info@highlandsmusicfestival.ca.
    </p>
  </>
);
export default function OrderConfirmation({ user = null }) {
  const isOrderSuccessful = !!user;
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
      {isOrderSuccessful ? <SuccessMessage user={user} /> : <ErrorMessage />}
    </div>
  );
}
