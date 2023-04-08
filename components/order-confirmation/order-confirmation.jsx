import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Logo from 'public/rainbow.png';
import styles from './order-confirmation.module.scss';
import clsx from 'clsx';

export default function CommitteePage({ customer, orderDetails }) {
  const isOrderSuccessful = orderDetails.status === 'succeeded';
  return (
    <div className={styles.orderConfirmationContainer}>
      {isOrderSuccessful ? (
        <>
          <Image
            src={Logo}
            alt="Highlands Music Festival logo"
            className={styles.logo}
            priority
            quality={10}
          />
          <p className={styles.orderConfirmed}>
            Order Confirmed{' '}
            <FontAwesomeIcon
              icon={faCheckCircle}
              //   size="2xl"
              className={styles.checkMark}
            />
          </p>
          <p className={styles.bodyCopy}>
            Thanks for your order, {customer.name}!
          </p>
          <p className={clsx(styles.bodyCopy, styles.bodyCopySmall)}>
            A confirmation email has been sent to {customer.email}.
          </p>
        </>
      ) : (
        <>
          <p>Hello {customer.name}</p>
          <p>Your order status is: {orderDetails.status}</p>
          <p>
            If you are having trouble placing an order, please contact us at
            info@highlandsmusicfestival.ca.
          </p>
        </>
      )}
    </div>
  );
}
