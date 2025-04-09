import styles from './OrderSummary.module.scss';
import {
  LineItem,
  OrderSummaryLayout,
} from 'components/CheckoutPage/order-summary/order-summary-shared';
import Loader from 'components/shared/Loader/Loader';
import { calculateCart } from 'components/CheckoutPage/checkout-utils';

export default function OrderSummary({ isLoading, cart }) {
  const { subtotal, tax, total } = calculateCart({ items: cart });
  return (
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
  );
}
