import Faq from 'components/FaqPage/faq';
import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getFaqPage, getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

const FAQPage = ({ showEmailCapture, faqData, festivalDate }) => {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="FAQ" festivalDate={festivalDate} />
      <Layout festivalDate={festivalDate}>
        <Faq data={faqData} />
      </Layout>
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
