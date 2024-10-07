import Home from 'components/Home/Home';
import Head from 'components/shared/Head/Head';
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
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head festivalDate={festivalDate} />
      <Home
        headlinerFeatureFlag={headlinerFeatureFlag}
        headliners={headliners}
        festivalDate={festivalDate}
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

  const headlinerFeatureFlag = await getFeatureFlags({
    name: FEATURE_FLAGS.HEADLINER_ANNOUNCEMENT,
  });

  return {
    props: {
      headliners,
      headlinerFeatureFlag,
      ...pageLoadData,
    },
  };
}
