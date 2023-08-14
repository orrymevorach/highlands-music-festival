import Home from 'components/home';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import {
  getFeatureFlags,
  getHeadliners,
  getPageLoadData,
} from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';

export default function Index({
  headlinerFeatureFlag = false,
  headliners,
  showEmailCapture,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head />
      <Home
        headlinerFeatureFlag={headlinerFeatureFlag}
        headliners={headliners}
      />
    </>
  );
}

export async function getStaticProps() {
  const headlinersResponse = await getHeadliners();
  const headliners = headlinersResponse.map(({ name }) => name);
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.HOME,
  });

  const featureFlags = await getFeatureFlags({
    name: FEATURE_FLAGS.HEADLINER_ANNOUNCEMENT,
  });

  const headlinerFeatureFlag = featureFlags[0].value;

  return {
    props: {
      headliners,
      headlinerFeatureFlag,
      ...pageLoadData,
    },
  };
}
