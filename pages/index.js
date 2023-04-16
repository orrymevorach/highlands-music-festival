import Home from 'components/home';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getFeatureFlags } from 'graphql/contentful-lib';
import { FEATURE_FLAGS } from 'utils/constants';

export default function Index({ headlinerFeatureFlag = false }) {
  return (
    <EmailCaptureProvider>
      <Head />
      <Home headlinerFeatureFlag={headlinerFeatureFlag} />
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
