import Home from 'components/home';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getFeatureFlags, getPageLoadData } from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';

export default function Index({ headlinerFeatureFlag = false }) {
  return (
    <EmailCaptureProvider>
      <Head />
      <Home headlinerFeatureFlag={headlinerFeatureFlag} />
    </EmailCaptureProvider>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.HOME,
  });

  const featureFlags = await getFeatureFlags({
    name: FEATURE_FLAGS.WILD_RIVERS_ANNOUNCEMENT,
  });

  const headlinerFeatureFlag = featureFlags[0].value;

  return {
    props: {
      headlinerFeatureFlag,
      ...pageLoadData,
    },
  };
}
