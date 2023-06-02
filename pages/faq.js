import Faq from 'components/faq/faq';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getFaqPage, getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

const FAQPage = ({ showEmailCapture, faqData }) => {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="FAQ" />
      <Faq data={faqData} />
    </>
  );
};
export default FAQPage;

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.FAQ,
  });
  const faqData = await getFaqPage();
  return {
    props: {
      faqData,
      ...pageLoadData,
    },
  };
}
