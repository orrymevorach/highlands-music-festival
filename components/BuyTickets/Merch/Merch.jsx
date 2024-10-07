import styles from './Merch.module.scss';
import Loader from 'components/shared/Loader/Loader';
import Card from './Card/Card';

const getCategories = ({ products }) => {
  let categories = [];
  for (let product of products) {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  }
  return categories;
};

const Category = ({ category, products }) => {
  return (
    <div className={styles.category}>
      <p className={styles.categoryTitle}>{category}</p>
      <div>
        {products.map(product => {
          const isCurrentCateogry = product.category === category;
          const isAvailable = product.status === 'Available';
          const isSold = product.status === 'Sold';
          if (isCurrentCateogry && isSold) {
            return <Card key={product.name} product={product} isSold />;
          }
          if (isCurrentCateogry && isAvailable) {
            return <Card key={product.name} product={product} />;
          }
        })}
      </div>
    </div>
  );
};

export default function Merch({ products = [] }) {
  if (!products.length) return <Loader />;

  const categories = getCategories({ products });
  return (
    <>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Ticket Pricing for Highlands 2025</h2>
        <p>(Closes Sunday October 6th at Midnight)</p>
      </div>
      <div className={styles.container}>
        {categories.map(category => {
          if (category === 'Test Mode' && process.env.NODE_ENV === 'production')
            return;

          return (
            <Category key={category} category={category} products={products} />
          );
        })}
      </div>
    </>
  );
}
