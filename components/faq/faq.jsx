import FaqCategories from './faq-categories/faq-categories';
import FaqCategoriesLinks from './faq-category-links/faq-category-links';
import styles from './faq.module.scss';

export default function Faq({ data }) {
  const mapCategoryTypeToName = {
    arrivalDepartureCollection: 'Arrivals & Departures',
    accommodationsPackingCollection: 'Accommodations & Packing',
    festivalOperationsCollection: 'Festival Operations & Procedures',
    foodBeverageCollection: 'Food & Beverage',
    ticketsCollection: 'Tickets',
    musicEntertainmentCollection: 'Music & Entertainment',
    healthAndSafetyCollection: 'Heath & Safety',
  };

  const categoryData = Object.entries(data).reduce((acc, curr) => {
    const [categoryType, categoryQuestions] = curr;
    if (categoryType === '__typename') return acc; // filter out _typename
    const categoryName = mapCategoryTypeToName[categoryType] || categoryType;
    const category = {
      categoryName,
      questions: categoryQuestions.items,
    };
    acc.push(category);
    return acc;
  }, []);
  return (
    <main>
      <div className={styles.faqWrapper}>
        <h1 className={styles.heading}>FAQ</h1>
        <FaqCategoriesLinks categoryData={categoryData} />
        <FaqCategories categoryData={categoryData} />
        <div>
          <p className={styles.otherQuestionsHeading}>
            What if I have other questions?
          </p>
          <p className={styles.otherQuestionsText}>
            Please reach out to us at info@highlandsmusicfestival.ca for any
            questions about the festival!
          </p>
        </div>
      </div>
    </main>
  );
}
