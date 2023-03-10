import './faq.scss';
import Layout from '@components/layout';
import { YellowSun } from '@images';
import Masonry from 'react-masonry-css';
import { useWindowSize } from 'hooks';
import { faq } from './faqData';

const FaqParagraph = ({ question, answer, Answer }) => (
  <div className="questionContainer" key={question}>
    <p className="question bodyCopyBold">{question}</p>
    {answer ? <p className="answer bodyCopy">{answer}</p> : <Answer />}
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
        <div className="faqWrapper">
          <h1 className="heading">FAQ</h1>
          <div className="faqContainer">
            <Masonry
              breakpointCols={numberOfColumns}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {faq.map(({ question, Answer, answer }) => (
                <FaqParagraph
                  key={question}
                  question={question}
                  answer={answer}
                  Answer={Answer}
                />
              ))}
              <YellowSun classNames="sunIcon" />
            </Masonry>
          </div>
        </div>
      </main>
    </Layout>
  );
}
