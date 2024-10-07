import { useWindowSize } from 'hooks';
import styles from './faq-category-links.module.scss';

export default function FaqCategoriesLinks({ categoryData }) {
  const { isDesktop } = useWindowSize();
  return (
    <div className={styles.categoryLinks}>
      {categoryData.map(({ categoryName }, index) => {
        const isLast = index + 1 === categoryData.length;
        return (
          <a
            className={styles.categoryLink}
            href={`#${categoryName}`}
            key={`${categoryName}-links`}
          >
            {categoryName}
            {!isLast && isDesktop && <span className={styles.border}>|</span>}
          </a>
        );
      })}
    </div>
  );
}
