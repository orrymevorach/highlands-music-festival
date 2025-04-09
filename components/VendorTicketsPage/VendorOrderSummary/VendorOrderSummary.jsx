import styles from './VendorOrderSummary.module.scss';
import OrderSummaryLayout, {
  LineItem,
} from 'components/shared/OrderSummaryLayout/OrderSummaryLayout';
import Loader from 'components/shared/Loader/Loader';
import { calculateCart } from 'components/CheckoutPage/checkout-utils';
import Button from 'components/shared/Button/Button';

export default function OrderSummary({ isLoading, cart }) {
  const { subtotal, tax, total } = calculateCart({ items: cart });
  return (
    <div className={styles.outerContainer}>
      <OrderSummaryLayout
        subtotal={subtotal}
        tax={tax}
        total={total}
        classNames={styles.container}
      >
        {isLoading ? (
          <Loader centerInContainer />
        ) : (
          cart.map(item => {
            return <LineItem label={item.name} price={item.price} />;
          })
        )}
      </OrderSummaryLayout>
      <Button classNames={styles.button}>Checkout</Button>
    </div>
  );
}
