import Layout from 'components/layout';
import Button from 'components/shared/button';
import styles from './buy-tickets.module.scss';

export default function BuyTickets() {
  return (
    <Layout>
      <div className={styles.buyTickets}>
        <Button
          href={{ pathname: '/checkout', query: { installments: 'false' } }}
          classNames={styles.button}
        >
          Pay Full Price
        </Button>
        <Button
          href={{ pathname: '/checkout', query: { installments: 'true' } }}
          classNames={styles.button}
        >
          Pay in Monthly Installments
        </Button>
      </div>
    </Layout>
  );
}
