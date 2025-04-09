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

const Category = ({ category, products, cart }) => {
  return (
    <div className={styles.category}>
      <p className={styles.categoryTitle}>{category}</p>
      <div>
        {products
          .filter(product => {
            if (product.status === 'Hide' || product.status === 'On Hold')
              return false;
            return true;
          })
          .map(product => {
            const isCurrentCateogry = product.category === category;
            const isAvailable = product.status === 'Available';
            const isSold = product.status === 'Sold';
            const isInCart = cart.some(
              cartProduct => cartProduct.name === product.name
            );
            if (isCurrentCateogry && isSold) {
              return (
                <Card
                  key={product.name}
                  product={product}
                  isSold
                  isInCart={isInCart}
                />
              );
            }
            if (isCurrentCateogry && isAvailable) {
              return (
                <Card
                  key={product.name}
                  product={product}
                  isInCart={isInCart}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default function Merch({
  products = [],
  title,
  sortAndFilterFunctions,
  cart,
}) {
  if (!products.length) return <Loader />;

  const categories = getCategories({ products });
  return (
    <>
      {title && (
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <div className={styles.container}>
        {sortAndFilterFunctions
          ? sortAndFilterFunctions(categories).map(category => {
              return (
                <Category
                  key={category}
                  category={category}
                  products={products}
                  cart={cart}
                />
              );
            })
          : categories.map(category => {
              return (
                <Category
                  key={category}
                  category={category}
                  products={products}
                  cart={cart}
                />
              );
            })}
      </div>
    </>
  );
}
