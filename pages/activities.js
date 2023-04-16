import Activities from 'components/activities';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getPageLoadData } from 'graphql/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function AboutPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Activities />
    </EmailCaptureProvider>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ACTIVITIES,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
