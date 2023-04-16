import About from 'components/about';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function AboutPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <About />
    </EmailCaptureProvider>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ABOUT,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
