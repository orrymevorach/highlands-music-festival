import Activities from 'components/activities';
import Head from 'components/head';
import Layout from 'components/layout/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getActivities, getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function ActivitiesPage({
  showEmailCapture,
  activities,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Activities" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <Activities activities={activities} />
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ACTIVITIES,
  });

  const activities = await getActivities();
  return {
    props: {
      ...pageLoadData,
      activities,
    },
  };
}
