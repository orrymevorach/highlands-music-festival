import Head from 'components/head';
import Schedule from 'components/schedule';
import Lineup from 'components/lineup';
import Layout from 'components/layout';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function LineupAndSchedule() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Layout>
        <main>
          <Lineup />
          <Schedule />
        </main>
      </Layout>
    </EmailCaptureProvider>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.LINEUP_AND_SCHEDULE,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
