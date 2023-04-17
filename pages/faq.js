import Faq from 'components/faq/faq';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

const FAQPage = () => {
  return (
    <EmailCaptureProvider>
      <Head />
      <Faq />
    </EmailCaptureProvider>
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
