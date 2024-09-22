import styles from './merch.module.scss';
import Loader from 'components/loader';
import Card from './card';

export default function Merch({ products = [] }) {
  if (!products.length) return <Loader />;
  return (
    <>
      <h2 className={styles.title}>Ticket Pricing for Highlands 2025</h2>
      <div className={styles.container}>
        {products.map(product => {
          if (product.status !== 'Sold')
            return <Card key={product.name} product={product} />;
        })}
      </div>
    </>
  );
}
