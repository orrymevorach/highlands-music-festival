import Head from 'components/head';
import Schedule from 'components/schedule';
import Lineup from 'components/lineup';
import Layout from 'components/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import {
  getFeatureFlags,
  getHeadliners,
  getPageLoadData,
} from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';

export default function LineupAndSchedule({
  headlinerFeatureFlag = false,
  headliners = [],
  showEmailCapture,
}) {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Lineup & Schedule" />
      <Layout>
        <main>
          <Lineup
            headlinerFeatureFlag={headlinerFeatureFlag}
            headliners={headliners}
          />
          {/* <Schedule /> */}
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const headlinersResponse = await getHeadliners();
  const headliners = headlinersResponse.map(({ name }) => name);

  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.LINEUP_AND_SCHEDULE,
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
