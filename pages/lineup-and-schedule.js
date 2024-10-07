import Head from 'components/head/head';
// import Schedule from 'components/schedule';
import Lineup from 'components/lineup/lineup';
import Layout from 'components/layout/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import {
  getFeatureFlags,
  getLineup,
  getLineupGraphics,
  getPageLoadData,
} from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';

export default function LineupAndSchedule({
  headlinerFeatureFlag = false,
  lineup = [],
  showEmailCapture,
  lineupGraphics,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Lineup & Schedule" festivalDate={festivalDate} />
      <Layout festivalDate={festivalDate}>
        <main>
          <Lineup
            headlinerFeatureFlag={headlinerFeatureFlag}
            lineup={lineup}
            lineupGraphics={lineupGraphics}
          />
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

  const headlinerFeatureFlag = await getFeatureFlags({
    name: FEATURE_FLAGS.HEADLINER_ANNOUNCEMENT,
  });

  const lineupGraphics = await getLineupGraphics();

  return {
    props: {
      lineup,
      headlinerFeatureFlag,
      lineupGraphics,
      ...pageLoadData,
    },
  };
}
