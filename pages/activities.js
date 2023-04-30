import Activities from 'components/activities';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function AboutPage({ showEmailCapture }) {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Activities" />
      <Activities />
    </>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ACTIVITIES,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
