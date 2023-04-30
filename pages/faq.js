import Faq from 'components/faq/faq';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

const FAQPage = ({ showEmailCapture }) => {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="FAQ" />
      <Faq />
    </>
  );
};
export default FAQPage;

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.FAQ,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
