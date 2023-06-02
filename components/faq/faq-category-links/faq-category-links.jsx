import styles from './faq-category-links.module.scss';

export default function FaqCategoriesLinks({ categoryData }) {
  return (
    <div className={styles.categoryLinks}>
      {categoryData.map(({ categoryName }, index) => {
        const isLast = index + 1 === categoryData.length;
        return (
          <a className={styles.categoryLink} href={`#${categoryName}`}>
            {categoryName}
            {!isLast && <span className={styles.border}>|</span>}
          </a>
        );
      })}
    </div>
  );
}
