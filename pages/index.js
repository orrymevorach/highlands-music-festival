import Home from 'components/home';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function Index() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Home />
    </EmailCaptureProvider>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.HOME,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
