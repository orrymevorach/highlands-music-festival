import Head from 'components/head';
import Schedule from 'components/schedule';
import Lineup from 'components/lineup';
import Layout from 'components/layout';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getFeatureFlags } from 'graphql/contentful-lib';
import { FEATURE_FLAGS } from 'utils/constants';

export default function LineupAndSchedule({ headlinerFeatureFlag = false }) {
  return (
    <EmailCaptureProvider>
      <Head />
      <Layout>
        <main>
          <Lineup headlinerFeatureFlag={headlinerFeatureFlag} />
          <Schedule />
        </main>
      </Layout>
    </EmailCaptureProvider>
  );
}

export async function getStaticProps() {
  const featureFlags = await getFeatureFlags({
    name: FEATURE_FLAGS.WILD_RIVERS_ANNOUNCEMENT,
  });

  const headlinerFeatureFlag = featureFlags[0].value;

  return {
    props: {
      headlinerFeatureFlag,
    },
  };
}
