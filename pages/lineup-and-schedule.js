import Head from 'components/head';
import Schedule from 'components/schedule';
import Lineup from 'components/lineup';
import Layout from 'components/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import {
  getFeatureFlags,
  getLineup,
  getPageLoadData,
} from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';

export default function LineupAndSchedule({
  headlinerFeatureFlag = false,
  lineup = [],
  showEmailCapture,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Lineup & Schedule" />
      <Layout>
        <main>
          <Lineup headlinerFeatureFlag={headlinerFeatureFlag} lineup={lineup} />
          {/* <Schedule /> */}
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const lineup = await getLineup();

  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.LINEUP_AND_SCHEDULE,
  });

  const featureFlags = await getFeatureFlags({
    name: FEATURE_FLAGS.HEADLINER_ANNOUNCEMENT,
  });
  const headlinerFeatureFlag = featureFlags[0].value;

  return {
    props: {
      lineup,
      headlinerFeatureFlag,
      ...pageLoadData,
    },
  };
}
