import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCheckoutContext } from 'context/checkout-context';
import styles from './promo-code-success.module.scss';

export default function PromoCodeSuccess() {
  const { promoCode } = useCheckoutContext();
  return (
    <div className={styles.successContainer}>
      <p>{promoCode} promotion successfully applied</p>
      <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
    </div>
  );
}
