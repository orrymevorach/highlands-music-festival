import styles from './VendorOrderSummary.module.scss';
import OrderSummaryLayout, {
  LineItem,
} from 'components/shared/OrderSummaryLayout/OrderSummaryLayout';
import { calculateCart } from 'components/CheckoutPage/checkout-utils';
import Button from 'components/shared/Button/Button';
import { createRecord } from 'lib/airtable-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function VendorOrderSummary({ cart }) {
  const [isLoading, setIsLoading] = useState(false);
  const { subtotal, tax, total } = calculateCart({ items: cart });
  const router = useRouter();

  const createCart = async () => {
    setIsLoading(true);
    const { response: cartResponse } = await createRecord({
      tableId: 'Carts',
      newFields: {
        Items: JSON.stringify(cart.map(item => item.id)),
        Subtotal: subtotal,
        Tax: tax,
        Total: total,
        Name: 'Vendor Ticket',
      },
    });
    Cookies.set('cartId', cartResponse.id, { expires: 3 });
    router.push(`/${PAGE_SLUGS.CHECKOUT}?vendor=true`);
  };
  const BottomContent = () => (
    <Button
      classNames={styles.button}
      handleClick={createCart}
      isLoading={isLoading}
    >
      Continue to Checkout
    </Button>
  );
  return (
    <div className={styles.outerContainer}>
      <OrderSummaryLayout
        subtotal={subtotal}
        tax={tax}
        total={total}
        classNames={styles.container}
        BottomContent={BottomContent}
      >
        {cart.map(item => {
          return <LineItem label={item.name} price={item.price} />;
        })}
      </OrderSummaryLayout>
    </div>
  );
}
