import RichText from 'components/shared/rich-text/rich-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './faq-categories.module.scss';

function FaqParagraph({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const icon = showAnswer ? faChevronUp : faChevronDown;
  return (
    <div className={styles.faqQuestionContainer} key={question}>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className={styles.questionContainer}
      >
        <p className={styles.question}>
          {question}
          <FontAwesomeIcon icon={icon} />
        </p>
      </button>
      {showAnswer && <RichText json={answer.json} />}
    </div>
  );
}

export default function FaqCategories({ categoryData }) {
  return (
    <div className={styles.categoryContainer}>
      {categoryData.map(({ categoryName, questions }) => {
        return (
          <div className={styles.column}>
            <p id={categoryName} className={styles.categoryHeading}>
              {categoryName}
            </p>
            {questions.map(({ question, answer }) => {
              return (
                <FaqParagraph
                  key={question}
                  question={question}
                  answer={answer}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
