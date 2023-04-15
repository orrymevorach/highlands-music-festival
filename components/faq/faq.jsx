import styles from './faq.module.scss';
import Layout from 'components/layout';
import Masonry from 'react-masonry-css';
import { useWindowSize } from 'hooks';
import { faq } from './faqData';
import clsx from 'clsx';
import Image from 'next/image';

const FaqParagraph = ({ question, answer, Answer }) => (
  <div className={styles.questionContainer} key={question}>
    <p className={clsx(styles.question, styles.bodyCopyBold)}>{question}</p>
    {answer ? (
      <p className={clsx(styles.answer, styles.bodyCopy)}>{answer}</p>
    ) : (
      <Answer />
    )}
  </div>
);

export default function Faq() {
  const { device } = useWindowSize();
  const mapDeviceToColumns = {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  };
  const numberOfColumns = mapDeviceToColumns[device];
  return (
    <Layout>
      <main>
        <div className={styles.faqWrapper}>
          <h1 className={styles.heading}>FAQ</h1>
          <div className={styles.faqContainer}>
            <Masonry
              breakpointCols={numberOfColumns}
              className={styles['my-masonry-grid']}
              columnClassName={styles['my-masonry-grid_column']}
            >
              {faq.map(({ question, Answer, answer }) => (
                <FaqParagraph
                  key={question}
                  question={question}
                  answer={answer}
                  Answer={Answer}
                />
              ))}
              <Image
                src="/yellow-sun.png"
                alt=""
                className={styles.sunIcon}
                width={1184}
                height={620}
              />
            </Masonry>
          </div>
        </div>
      </main>
    </Layout>
  );
}
